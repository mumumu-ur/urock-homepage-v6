// UROCK Hero — Coordinate Focus HUD.
//
// Independent, additive front/overlay layer for the Hero ScrollWorld. This
// file does NOT touch hero-scrollworld.js, its ScrollWorld timeline, its
// Carousel Navigation Group Mapping, video scrub/seek transport, or any
// existing Scene/Transition/Copy element — it only READS the existing
// signals hero-scrollworld.js already publishes for exactly this kind of
// external consumption: the `--hsw-copy-N` CSS custom properties it writes
// on <html> every active tick, one per Scene (see hero-scrollworld.js's own
// file-header comment on why these vars live on <html> rather than as
// inline styles on a template-authored child — the same reasoning applies
// here, see setVar() below).
//
// Originally built for Scene 2 (the central data cube + the small crystal
// shard), then extended on request to Scene 1 (the two floating object-01/
// object-02 cubes) — every instance below shares this one file/lifecycle,
// each independently keyed to whichever Scene it belongs to via its own
// data-hsw-s2hud-scene="N" attribute:
//   - Scene 2 instances ("cube"/"crystal") anchor to a fixed point within
//     Scene 2's background image (object-fit:cover crop math, static
//     per-viewport calc() — nothing to track live, the image itself never
//     moves).
//   - Scene 1 instances ("obj01"/"obj02") anchor to the live on-screen
//     center of the existing .hsw-object-01/-02 <img> elements instead —
//     those are real, separately-animating DOM nodes (their own entrance
//     translate/rotate + the existing --hsw-copy-1-driven ease), so a
//     static formula would drift; getBoundingClientRect() is re-read every
//     tick (see updateTrack()) and only WRITES a plain viewport-px value to
//     <html>, never an inline style on the tracked element itself, so this
//     never touches object-01/02's own styling.
//
// Lifecycle: `--hsw-copy-N` is the same 0..1 eased opacity value that
// already drives that Scene's headline/panel fade — it sits at (near) 0
// outside that Scene's hold segment and ramps to 1 while its copy is fully
// visible, staying pinned at 1 through minor scroll within that hold (see
// hero-scrollworld.js _applyState()'s inT/outT easing). Edge-triggering on
// it crossing the same 0.02 threshold hero-scrollworld.js's own
// copyRevealed logic already uses gives exactly the "enter once / do not
// restart on minor scroll / reset on leave / replay on re-entry" behavior
// every HUD instance needs, with no new scroll listener and no new
// requestAnimationFrame loop of our own — detection (and, for Scene 1,
// position tracking) is driven by a MutationObserver watching the same
// <html> style attribute hero-scrollworld.js's existing rAF tick already
// writes to, so this reacts to its existing update cadence instead of
// polling independently.
(function () {
  // The dc-runtime re-fetches+recompiles the whole x-dc template shortly
  // after first mount (support.js boot()'s `!window.__resources` path) and
  // that re-render can reinsert this file's own <script src> as a *new*
  // node, which the browser re-executes — confirmed directly (network log
  // showed two separate requests for this file, ~0.3-0.7s apart, on a plain
  // page load). hero-scrollworld.js guards the same hazard with its
  // `customElements.get(...)` check; this is the equivalent for a plain
  // script with no such built-in registry. Without it, the second execution
  // built its own independent MutationObserver + GSAP timeline per anchor
  // that wrote the *same* --s2h-<id>-* vars as the first, so the two
  // animations raced and stomped each other (observed: anchor-op climbing
  // to 1, dropping back to ~0.66, re-climbing — mid-animation, not a replay).
  if (window.__urockHeroCoordHudBooted) return;
  window.__urockHeroCoordHudBooted = true;

  var root = document.documentElement;
  var THRESH = 0.02;

  function setVar(name, value) { root.style.setProperty(name, value); }

  function makeController(anchor) {
    var id = anchor.getAttribute('data-hsw-s2hud') || 'a';
    var sceneN = anchor.getAttribute('data-hsw-s2hud-scene') || '2';
    var copyVarName = '--hsw-copy-' + sceneN;
    var trackSelector = anchor.getAttribute('data-s2hud-track');
    // Re-resolved on every use (see getTrackEl()) rather than captured
    // once here — the DC template runtime streams its light-DOM children
    // in progressively, and boot() below only waits for THIS file's own
    // [data-hsw-s2hud] anchor markup to exist, not for .hsw-object-01/-02
    // (which sit later in source order, inside .hsw-copy) to have arrived
    // too. Capturing document.querySelector(trackSelector) once here could
    // — and, confirmed via repeated headless runs, does, intermittently —
    // resolve to null if makeController() runs in that gap, permanently
    // disabling updateTrack()/whenLanded() for that instance with nothing
    // ever retrying: every anchor would then sit at its CSS fallback
    // (`left:var(--s2h-obj01-x,50%)`, i.e. dead center) instead of its
    // cube, which is the exact "좌표값 위치가 이상해" symptom reported —
    // not a live-position-tracking bug (that part was already correct
    // whenever trackEl *did* resolve) but a one-time null capture.
    // Scene 1 instances (obj01/obj02, the only ones with a trackSelector —
    // Scene 2's cube/crystal are baked into the background image and never
    // move) sit on a cube that itself flies in via a CSS `animation` (see
    // .hsw-object-01/-02 in index.html). On request, this HUD's own reveal
    // sequence below now waits for that flight to actually land before
    // starting ("오브젝트가 이동하고 나서 바로 좌표값이... 카운팅") —
    // previously both ran concurrently, and since updateTrack() re-centers
    // this whole anchor on the cube's LIVE (still-mid-flight) position
    // every tick, the bracket/label was chasing a moving target during
    // that window, which is what actually produced the "위치가 이상해"
    // symptom (report screenshot: both instances caught near screen-
    // center, where their entrance paths used to cross mid-flight) — not a
    // tracking bug.
    // whenLanded() below waits on the tracked element's own Animation(s) —
    // not a fixed guessed delay — because how much of the cube's 1s
    // entrance is left to run when play() fires depends on how fast the
    // splash's real asset preload finishes (see gateOpen), which varies
    // with cache/network state: a fixed delay tuned for a slow splash
    // would be pure dead air added on top of an already-finished cube on a
    // fast/cached load. getAnimations() covers a plain CSS `animation`
    // exactly like a WAAPI one (both surface as Animation objects with
    // their own .finished promise here), and an animation that already
    // finished before this runs still resolves .finished immediately (its
    // promise settled the moment it finished, independent of when
    // something starts awaiting it) — so this is correct whether
    // makeController() happens to run before or after the cube lands.
    function getTrackEl() { return trackSelector ? document.querySelector(trackSelector) : null; }

    function whenLanded(cb) {
      var el = getTrackEl();
      var anims = el && el.getAnimations ? el.getAnimations() : [];
      if (!anims.length) { cb(); return; } // no cube to wait for (Scene 2), or already fully settled/removed
      Promise.all(anims.map(function (a) { return a.finished.catch(function () {}); })).then(cb);
    }

    function vn(suffix) { return '--s2h-' + id + '-' + suffix; }

    // Re-resolved on every use (getEls()), same reasoning and same fix as
    // getTrackEl() above, for a related but distinct DC-runtime hazard:
    // this file's own header comment already documents the *script*
    // re-executing as a new node; separately (confirmed via headless runs
    // showing this exact split — see below), the runtime can ALSO swap out
    // an already-mounted anchor's own subtree once, early, without
    // re-running any script — the same class of hazard hero-scrollworld.js
    // documents and defends against for <blur-reveal> children (its
    // dc-runtime-element-swap note). A captured `els.label`/`.lat`/`.lon`
    // here would silently start writing into DETACHED nodes once that
    // happens: the CSS-var-driven parts of this HUD (anchor-op, brackets,
    // target ring, connector — anything read via var(--s2h-...) in
    // index.html) keep animating correctly regardless, since custom
    // properties on <html> apply globally to whatever's live in the DOM —
    // but textContent writes to a stale `els.lat`/`.label` have zero
    // visible effect, leaving the *visible* label/lat/lon frozen at
    // whatever the authored markup's static fallback text already was
    // (this markup bakes the FINAL coordinate in as that fallback — see
    // the anchor's own data-s2hud-lat literal in index.html — which is
    // exactly the "already at final value, never counted" symptom
    // reported). Confirmed directly: repeated headless runs showed
    // --s2h-obj01-anchor-op animating 0->1 correctly every time while
    // lat/label sometimes never moved past their idle/final text — the
    // split only makes sense if the CSS-var path and the textContent path
    // were reaching two different DOM subtrees.
    function getAnchorEl() { return document.querySelector('[data-hsw-s2hud="' + id + '"]'); }
    function getEls() {
      var a = getAnchorEl();
      if (!a) return null;
      return {
        label: a.querySelector('[data-s2hud-label]'),
        lat: a.querySelector('[data-s2hud-lat]'),
        lon: a.querySelector('[data-s2hud-lon]'),
      };
    }

    // Generic HUD interface data only — not UROCK HQ, not a user position,
    // not any real detected location (spec Section 7). Each instance
    // resolves to its own distinct value so no two HUDs show the same
    // coordinate.
    var FINAL = anchor.hasAttribute('data-s2hud-final-lat')
      ? { lat: parseFloat(anchor.getAttribute('data-s2hud-final-lat')), lon: parseFloat(anchor.getAttribute('data-s2hud-final-lon')) }
      : { lat: 37.5665, lon: 126.9780 };
    var START = { lat: FINAL.lat - 2.65, lon: FINAL.lon - 2.87 };

    var state = { anchorOp: 0, brT: 0, brOp: 0, tgOp: 0, tgS: 0.6, connOff: null, coordOp: 0 };
    // Path length differs per instance — read the authored dash length back
    // off the CSS so this stays in sync with the stylesheet instead of a
    // second hard-coded number here.
    var pathEl = anchor.querySelector('.hsw-s2hud-connector-path');
    var dashLen = pathEl ? parseFloat(getComputedStyle(pathEl).strokeDasharray) || 164 : 164;
    state.connOff = dashLen;

    function sync() {
      setVar(vn('anchor-op'), state.anchorOp.toFixed(3));
      setVar(vn('br-t'), state.brT.toFixed(3));
      setVar(vn('br-op'), state.brOp.toFixed(3));
      setVar(vn('tg-op'), state.tgOp.toFixed(3));
      setVar(vn('tg-s'), state.tgS.toFixed(3));
      setVar(vn('conn-off'), state.connOff.toFixed(1));
      setVar(vn('coord-op'), state.coordOp.toFixed(3));
    }

    var coords = { lat: START.lat, lon: START.lon };
    function syncCoords() {
      var els = getEls();
      if (!els) return;
      if (els.lat) els.lat.textContent = coords.lat.toFixed(4);
      if (els.lon) els.lon.textContent = coords.lon.toFixed(4);
    }
    function setLabel(text) {
      var els = getEls();
      if (els && els.label) els.label.textContent = text;
    }

    // -- live position tracking (Scene 1 instances only) --------------------
    // Reads the tracked element's current viewport-relative box each tick
    // and writes its center as a plain px custom property — .hsw-stage is
    // position:sticky;top:0, pinned flush with the viewport for this whole
    // sequence, so getBoundingClientRect()'s viewport-relative values line
    // up directly with this anchor's own (gate-relative, effectively
    // viewport-relative) left/top with no coordinate translation needed.
    // getTrackEl() re-queries every call (see its own comment above) —
    // cheap (one querySelector against a class selector) and the only way
    // this ever recovers from running before .hsw-object-01/-02 existed.
    function updateTrack() {
      var trackEl = getTrackEl();
      if (!trackEl) return;
      var r = trackEl.getBoundingClientRect();
      if (!r.width && !r.height) return; // display:none (e.g. mobile) — keep last known value, harmless while hidden
      setVar(vn('x'), (r.left + r.width / 2).toFixed(1) + 'px');
      setVar(vn('y'), (r.top + r.height / 2).toFixed(1) + 'px');
    }

    var mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var tl = null;

    function applyIdle() {
      state.anchorOp = 0; state.brT = 0; state.brOp = 0;
      state.tgOp = 0; state.tgS = 0.6; state.connOff = dashLen; state.coordOp = 0;
      sync();
    }

    function applyFinal() {
      state.anchorOp = 1; state.brT = 1; state.brOp = 1;
      state.tgOp = 1; state.tgS = 1; state.connOff = 0; state.coordOp = 1;
      sync();
      coords.lat = FINAL.lat; coords.lon = FINAL.lon;
      syncCoords();
      setLabel('TARGET LOCK');
    }

    function play() {
      if (tl) { tl.kill(); tl = null; }
      applyIdle();
      coords.lat = START.lat; coords.lon = START.lon;
      syncCoords();

      if (mqReduced.matches) {
        // Reduced motion (Section 14): no staged sequence, no rapid
        // coordinate scanning, no connector draw-in — settle directly on
        // the final state and only fade the group in.
        applyFinal();
        state.anchorOp = 0; sync();
        gsap.to(state, { anchorOp: 1, duration: 0.3, ease: 'power1.out', onUpdate: sync });
        return;
      }

      // Built paused: everything stays at the idle state applyIdle() just
      // set above (anchor invisible) until whenLanded() below actually
      // starts it — see that function's comment for why this is an event
      // wait, not a fixed delay. `myTl` (not the outer `tl`) is what the
      // callback checks against, so a stale callback from a since-
      // superseded play()/reset() can never resurrect a killed timeline.
      var myTl = gsap.timeline({
        paused: true,
        onUpdate: sync,
        onComplete: function () { setLabel('COORDINATE IDENTIFIED'); },
      });
      myTl.call(function () { setLabel('SEARCHING'); }, null, 0)
        .to(state, { anchorOp: 1, duration: 0.3, ease: 'power1.out' }, 0)
        .to(state, { brT: 1, brOp: 1, duration: 0.5, ease: 'power3.out' }, 0.15)
        .to(state, { tgOp: 1, tgS: 1, duration: 0.3, ease: 'back.out(1.7)' }, 0.40)
        .call(function () { setLabel('TARGET LOCK'); }, null, 0.55)
        .to(state, { tgS: 1.14, duration: 0.08, ease: 'power1.out' }, 0.55)
        .to(state, { tgS: 1, duration: 0.18, ease: 'power1.inOut' }, 0.63)
        .to(state, { connOff: 0, duration: 0.35, ease: 'power2.inOut' }, 0.65)
        .to(state, { coordOp: 1, duration: 0.3, ease: 'power1.out' }, 0.90)
        .to(coords, { lat: FINAL.lat, lon: FINAL.lon, duration: 0.85, ease: 'power3.out', onUpdate: syncCoords }, 0.95);
      tl = myTl;
      whenLanded(function () { if (tl === myTl) tl.play(); });
    }

    function reset() {
      if (tl) { tl.kill(); tl = null; }
      gsap.killTweensOf(state);
      applyIdle();
    }

    applyIdle();
    updateTrack();

    var isActive = false;
    function tick() {
      updateTrack();
      var v = parseFloat(getComputedStyle(root).getPropertyValue(copyVarName));
      var now = (isNaN(v) ? 0 : v) > THRESH;
      // While the splash is still up nobody can see this play — position
      // tracking keeps running so nothing jumps once revealed, but the
      // play()/reset() edge-trigger (and `isActive` itself) is deliberately
      // left untouched here; see gateOpen below for why, and how it catches
      // up in one shot once the splash lifts.
      if (!gateOpen) return;
      if (now !== isActive) {
        isActive = now;
        isActive ? play() : reset();
      }
    }
    // sceneN + replay: exposed for hero-scrollworld.js's Scene 1 Dot-click
    // replay (see the urock:hero-scene1-replay listener in boot() below) —
    // an unconditional re-play, bypassing the isActive edge-trigger above
    // entirely (a same-Scene re-click never changes copyVarName's value,
    // so that edge-trigger alone would never fire again on its own).
    return { tick: tick, sceneN: sceneN, replay: play };
  }

  // Scene 1's copy (and this HUD's trigger var, --hsw-copy-1) is forced to
  // full opacity almost immediately on mount — entirely independent of the
  // splash screen's own asset-loading gate (splash-loader.js), which can
  // stay up far longer (it waits on real Hero video/image bytes). Measured
  // directly: on a throttled connection the HUD's ~1.6s lock-on timeline
  // finished while the splash was still at single-digit percent — so by the
  // time the splash lifted, all a visitor ever saw was the static "TARGET
  // LOCK" end frame, never the scan-in motion. gateOpen defers the very
  // first play()/reset() decision (see tick() above) until the splash
  // signals it's done — or immediately if there's no splash to wait for.
  var gateOpen = true;

  function boot() {
    if (typeof gsap === 'undefined') return; // GSAP not present — HUDs stay hidden via CSS default, nothing else to do.
    var anchorEls = document.querySelectorAll('[data-hsw-s2hud]');
    if (!anchorEls.length) return;
    var controllers = Array.prototype.map.call(anchorEls, makeController);

    var mo = new MutationObserver(function () {
      controllers.forEach(function (c) { c.tick(); });
    });
    mo.observe(root, { attributes: true, attributeFilter: ['style'] });

    var splashEl = document.getElementById('splash-loader');
    gateOpen = window.__urockSplashLoaded === true || !splashEl || splashEl.getAttribute('data-done') === 'true';
    controllers.forEach(function (c) { c.tick(); }); // reflect current state immediately (e.g. mid-Hero refresh)

    if (!gateOpen) {
      var opened = false;
      var openGate = function () {
        if (opened) return;
        opened = true;
        gateOpen = true;
        controllers.forEach(function (c) { c.tick(); }); // catch up in one shot
      };
      window.addEventListener('urock:splash-loaded', openGate, { once: true });
      // Fallback in case the splash markup/script is ever missing or stalls
      // past its own hard timeout — never leave the HUD gated forever.
      setTimeout(openGate, 30000);
    }

    // Scene 1 Dot-click replay (on request) — see the matching dispatch +
    // comment in hero-scrollworld.js's _replayScene1Entry(). Scoped to
    // sceneN === '1' only: Scene 2's cube/crystal instances are untouched,
    // same "other Scenes stay out of this" scope every earlier Scene 1
    // Dot-replay request in this file's history has kept to.
    window.addEventListener('urock:hero-scene1-replay', function () {
      controllers.forEach(function (c) { if (c.sceneN === '1') c.replay(); });
    });
  }

  // Same bounded-retry rAF wait hero-scrollworld.js/blur-reveal.js already
  // use for the DC template runtime's async light-DOM streaming — not a
  // persistent loop, it stops permanently once the markup is found (or after
  // giving up).
  function scheduleBoot(tries) {
    requestAnimationFrame(function () {
      if (typeof gsap !== 'undefined' && document.querySelector('[data-hsw-s2hud]')) return boot();
      if ((tries || 0) < 80) return scheduleBoot((tries || 0) + 1);
    });
  }
  scheduleBoot(0);
})();
