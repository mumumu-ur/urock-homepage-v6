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
  var root = document.documentElement;
  var THRESH = 0.02;

  function setVar(name, value) { root.style.setProperty(name, value); }

  function makeController(anchor) {
    var id = anchor.getAttribute('data-hsw-s2hud') || 'a';
    var sceneN = anchor.getAttribute('data-hsw-s2hud-scene') || '2';
    var copyVarName = '--hsw-copy-' + sceneN;
    var trackSelector = anchor.getAttribute('data-s2hud-track');
    var trackEl = trackSelector ? document.querySelector(trackSelector) : null;

    function vn(suffix) { return '--s2h-' + id + '-' + suffix; }

    var els = {
      label: anchor.querySelector('[data-s2hud-label]'),
      lat: anchor.querySelector('[data-s2hud-lat]'),
      lon: anchor.querySelector('[data-s2hud-lon]'),
    };

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
      if (els.lat) els.lat.textContent = coords.lat.toFixed(4);
      if (els.lon) els.lon.textContent = coords.lon.toFixed(4);
    }

    // -- live position tracking (Scene 1 instances only) --------------------
    // Reads the tracked element's current viewport-relative box each tick
    // and writes its center as a plain px custom property — .hsw-stage is
    // position:sticky;top:0, pinned flush with the viewport for this whole
    // sequence, so getBoundingClientRect()'s viewport-relative values line
    // up directly with this anchor's own (gate-relative, effectively
    // viewport-relative) left/top with no coordinate translation needed.
    function updateTrack() {
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
      if (els.label) els.label.textContent = 'TARGET LOCK';
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

      tl = gsap.timeline({
        onUpdate: sync,
        onComplete: function () { if (els.label) els.label.textContent = 'COORDINATE IDENTIFIED'; },
      });
      tl.call(function () { if (els.label) els.label.textContent = 'SEARCHING'; }, null, 0)
        .to(state, { anchorOp: 1, duration: 0.3, ease: 'power1.out' }, 0)
        .to(state, { brT: 1, brOp: 1, duration: 0.5, ease: 'power3.out' }, 0.15)
        .to(state, { tgOp: 1, tgS: 1, duration: 0.3, ease: 'back.out(1.7)' }, 0.40)
        .call(function () { if (els.label) els.label.textContent = 'TARGET LOCK'; }, null, 0.55)
        .to(state, { tgS: 1.14, duration: 0.08, ease: 'power1.out' }, 0.55)
        .to(state, { tgS: 1, duration: 0.18, ease: 'power1.inOut' }, 0.63)
        .to(state, { connOff: 0, duration: 0.35, ease: 'power2.inOut' }, 0.65)
        .to(state, { coordOp: 1, duration: 0.3, ease: 'power1.out' }, 0.90)
        .to(coords, { lat: FINAL.lat, lon: FINAL.lon, duration: 0.85, ease: 'power3.out', onUpdate: syncCoords }, 0.95);
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
      if (now !== isActive) {
        isActive = now;
        isActive ? play() : reset();
      }
    }
    return { tick: tick };
  }

  function boot() {
    if (typeof gsap === 'undefined') return; // GSAP not present — HUDs stay hidden via CSS default, nothing else to do.
    var anchorEls = document.querySelectorAll('[data-hsw-s2hud]');
    if (!anchorEls.length) return;
    var controllers = Array.prototype.map.call(anchorEls, makeController);

    var mo = new MutationObserver(function () {
      controllers.forEach(function (c) { c.tick(); });
    });
    mo.observe(root, { attributes: true, attributeFilter: ['style'] });
    controllers.forEach(function (c) { c.tick(); }); // reflect current state immediately (e.g. mid-Hero refresh)
  }

  // Same bounded-retry rAF wait hero-scrollworld.js/blur-reveal.js already
  // use for the DC template runtime's async light-DOM streaming — not a
  // persistent loop, it stops permanently once the markup is found (or after
  // giving up).
  function scheduleBoot(tries) {
    requestAnimationFrame(function () {
      if (document.querySelector('[data-hsw-s2hud]')) return boot();
      if ((tries || 0) < 80) return scheduleBoot((tries || 0) + 1);
    });
  }
  scheduleBoot(0);
})();
