// UROCK splash loader — a full-screen overlay shown from first paint that
// blocks entry into the homepage until the Hero's own video/image assets are
// warmed into the browser's HTTP cache, then fades out to reveal the page.
//
// Why these particular files: they're exactly the Hero's active Scene
// stills + Transition videos (see CONFIG.scenes / CONFIG.transitions in
// hero-scrollworld.js) — the 3 leftover hero-transition-02-03/04-05/06-07.mp4
// files in assets/hero/ are unused stale clips from a removed Scene layout
// and are deliberately NOT listed here. hero-scrollworld.js itself still
// lazy-loads Scenes 2/4/6 and every Transition on demand via data-src as the
// visitor scrolls (preload="none") — this loader doesn't change that, it
// just fetches the same URLs once up front via XHR so that later swap
// (data-src -> src) is served from cache instead of hitting the network,
// which is what makes the scroll-scrub feel instant once the splash lifts.
//
// Progress shown is real measured bytes (XMLHttpRequest `progress` events),
// not a fake timed animation, eased frame-to-frame only for smoothness.
//
// On completion this also sets window.__urockSplashLoaded = true and fires
// a `urock:splash-loaded` event on window — the public hook anything hidden
// behind the splash can use to defer its own first reveal/animation until
// there's actually an audience for it (see hero-coord-hud.js).
(function () {
  var root = document.getElementById('splash-loader');
  if (!root) return;

  var fill = root.querySelector('.splash-bar-fill');
  var pctEl = root.querySelector('.splash-pct');
  if (!fill || !pctEl) return;

  // `size` is the on-disk byte size at authoring time — used only as the
  // initial weight/estimate before each request's real Content-Length
  // arrives (see the ls -la this was captured from). Every asset here is
  // same-origin, so Content-Length is expected to be reliably computable in
  // practice; the estimate just avoids the bar sitting at a misleading 0%
  // for the first frame or two.
  var ASSETS = [
    { url: 'assets/hero/hero-scene-01.webp', size: 48432 },
    { url: 'assets/hero/hero-scene-02.webp', size: 58522 },
    { url: 'assets/hero/hero-scene-04.webp', size: 1326836 },
    { url: 'assets/hero/hero-scene-06.webp', size: 1460456 },
    { url: 'assets/hero/hero-transition-01-02.mp4', size: 1749339 },
    { url: 'assets/hero/hero-transition-03-04.mp4', size: 14161925 },
    { url: 'assets/hero/hero-transition-05-06.mp4', size: 15370371 }
  ];
  // Absolute ceiling: whatever the real network state is, never trap a
  // visitor behind one stalled/blocked request past this many ms.
  var HARD_TIMEOUT_MS = 25000;

  var state = ASSETS.map(function (a) {
    return { total: a.size, loaded: 0 };
  });

  var actualPct = 0;
  var shownPct = 0;
  var forceComplete = false;
  var removed = false;

  function recompute() {
    var totalBytes = 0, loadedBytes = 0;
    for (var i = 0; i < state.length; i++) {
      totalBytes += state[i].total;
      loadedBytes += Math.min(state[i].loaded, state[i].total);
    }
    actualPct = totalBytes ? (loadedBytes / totalBytes) * 100 : 100;
  }

  function render() {
    var shown = Math.max(0, Math.min(100, Math.round(shownPct)));
    fill.style.width = shown + '%';
    pctEl.textContent = shown + '%';
  }

  function finish() {
    if (removed) return;
    removed = true;
    root.setAttribute('data-done', 'true');
    document.documentElement.style.removeProperty('overflow');
    // Public signal for anything gated behind the splash (e.g. the Hero
    // Coordinate HUD's one-shot lock-on animation — it's driven purely by
    // hero-scrollworld.js's scroll/mount state and used to finish playing
    // while still hidden back here, so it only ever revealed the static
    // end frame; see hero-coord-hud.js's gateOpen/openGate). The flag is set
    // *before* dispatch so a listener attached late (after this already
    // fired) can still detect completion by reading it instead of missing
    // the event.
    window.__urockSplashLoaded = true;
    window.dispatchEvent(new CustomEvent('urock:splash-loaded'));
    var cleared = false;
    function clear() {
      if (cleared) return;
      cleared = true;
      if (root.parentNode) root.parentNode.removeChild(root);
    }
    root.addEventListener('transitionend', function onEnd(e) {
      if (e.target !== root) return;
      root.removeEventListener('transitionend', onEnd);
      clear();
    });
    setTimeout(clear, 900); // safety net if transitionend never fires (e.g. backgrounded tab)
  }

  function raf() {
    if (removed) return;
    var target = forceComplete ? 100 : actualPct;
    shownPct += (target - shownPct) * 0.15;
    if (Math.abs(target - shownPct) < 0.2) shownPct = target;
    render();
    if (shownPct >= 100) finish();
    else requestAnimationFrame(raf);
  }

  function loadOne(asset, entry) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', asset.url, true);
      xhr.responseType = 'blob'; // download into the HTTP cache; body itself is unused
      xhr.timeout = HARD_TIMEOUT_MS;
      xhr.onprogress = function (e) {
        if (e.lengthComputable) entry.total = e.total;
        entry.loaded = e.loaded;
        recompute();
      };
      var settle = function () {
        entry.loaded = entry.total;
        recompute();
      };
      xhr.onload = settle;
      xhr.onerror = settle;
      xhr.onabort = settle;
      xhr.ontimeout = settle;
      xhr.send();
    } catch (e) {
      entry.loaded = entry.total;
      recompute();
    }
  }

  document.documentElement.style.overflow = 'hidden';
  ASSETS.forEach(function (a, i) { loadOne(a, state[i]); });
  requestAnimationFrame(raf);
  setTimeout(function () { forceComplete = true; }, HARD_TIMEOUT_MS);
})();
