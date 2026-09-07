// UROCK Hero ScrollWorld — config-driven scroll scrubber for the Hero.
//
// Structure per Scene: Still image -> Transition video -> Still image.
// The camera motion comes entirely from the supplied Transition videos;
// this file only maps scroll progress to (a) which layer is visible and
// (b) a video's currentTime. Same architecture as scroll-word-reveal.js /
// blur-reveal.js: a self-contained custom element, a single shared
// scroll+rAF loop, imperative style writes (no React state per frame).
//
// Timeline shape (normalized 0..1 across the element's own scroll range):
//   [Scene1 hold] [Transition1-2 scrub] [Scene2 hold] [Transition2-4 scrub]
//   [Scene4 hold] [Transition4-6 scrub] [Scene6 hold]
// Scenes 3 and 5 were removed (their stills deleted) once the Transition
// videos bridging 2->4 and 4->6 were re-cut as single continuous clips that
// already carry that ground — see CONFIG.transitions below; Scene numbers
// otherwise still match their asset filenames (hero-scene-04.webp etc.), so
// this file never renumbers Scenes to stay consecutive.
// Scene 6 is the final Scene — its hold is the last segment in the
// timeline, so once it finishes the pinned stage releases (native CSS
// `position: sticky`) and normal page scroll carries on into the next
// section below the Hero. No JS is needed for that hand-off; see
// _positionAndProgress()'s comment further down for why.
(function () {
  if (customElements.get('hero-scrollworld')) return;

  // ---------------------------------------------------------------------
  // Centralized configuration — asset paths, copy, hold/transition ratios,
  // per-scene object-position, breakpoints, reduced-motion image. Nothing
  // below this block hard-codes an asset path, timeline number, or string.
  // ---------------------------------------------------------------------
  var BASE = 'assets/hero/';
  var CONFIG = {
    base: BASE,
    // hold: relative weight (vh-equivalent units) the still is held on screen.
    // objectPosition: { desktop, mobile } — desktop value also serves tablet.
    scenes: [
      { n: 1, img: BASE + 'hero-scene-01.webp', hold: 92,
        copy: { tag: 'h1', lines: ['보이지 않는 곳에도,', '디지털 흔적은 남습니다.'] },
        objectPosition: { desktop: '50% 42%', mobile: '64% 38%' } },
      // Hold bumped from 46 to 94 (matches Scene 4, the other mid-sequence
      // "p" copy Scene) — at 46 the copy's fade-in/out (each CONFIG.copyEase
      // = 18% of the hold) only left a very short, rushed-feeling fully-
      // visible window; this gives it the same breathing room as Scene 4's
      // copy, which both slows the perceived fade (same 18% of a bigger
      // number = more scroll distance per step) and keeps it fully visible
      // longer before that fade-out starts.
      { n: 2, img: BASE + 'hero-scene-02.webp', hold: 94,
        copy: { tag: 'p', lines: ['수많은 기록 속,', '숨겨진 가치를 발견합니다.'] },
        objectPosition: { desktop: '57% 53%', mobile: '62% 46%' } },
      { n: 4, img: BASE + 'hero-scene-04.webp', hold: 94,
        copy: { tag: 'p', lines: ['흩어진 조각이 모여,', '진실에 더 가까이.'] },
        objectPosition: { desktop: '58% 52%', mobile: '56% 45%' } },
      // Scene 6 — final Scene (Scene 7 removed; this is now the last hold
      // segment in the timeline, see the file-header comment above). Hold
      // bumped from 46 to 118 (was Scene 7's value) so the Carousel-4
      // {5,6} copy exposure — moved here verbatim from the old Scene 7 —
      // gets the same comfortable lingering read time it had before.
      { n: 6, img: BASE + 'hero-scene-06.webp', hold: 118,
        copy: { tag: 'p', lines: ['안전하게 지켜내는 기술,', '그 중심에 UROCK이 있습니다.'] },
        objectPosition: { desktop: '50% 55%', mobile: '50% 55%' } },
    ],
    transitions: [
      { from: 1, to: 2, src: BASE + 'hero-transition-01-02.mp4', vh: 145 },
      // 2->4 and 4->6 each replace what used to be two separate Transition
      // clips plus the Scene-3/Scene-5 hold between them (145+46+145=336)
      // with one continuously-shot clip covering the same ground — vh kept
      // at that same 336 sum so the total Hero scroll length is unchanged
      // and this stretch doesn't suddenly scrub faster/slower than before.
      { from: 2, to: 4, src: BASE + 'hero-transition-03-04.mp4', vh: 336 },
      { from: 4, to: 6, src: BASE + 'hero-transition-05-06.mp4', vh: 336 },
    ],
    // Mobile fallback (no video scrub — see Section 15 of spec / completion
    // report): transitions collapse to a plain still-to-still crossfade and
    // get a shorter dwell since there is no camera-flight to watch.
    mobileTransitionVh: 92,
    // How much of a *transition segment's* local progress (0..1) is spent
    // crossfading at each end, to hide any minor seam mismatch. Kept short
    // per spec — this is not a dissolve, just enough to avoid a hard cut.
    seamCrossfade: 0.05,
    // How much of a *scene hold segment's* local progress is spent fading
    // its copy in / out.
    copyEase: 0.18,
    copyTranslate: 16, // px
    reducedMotionImage: BASE + 'hero-scene-01.webp',
    breakpoints: { tabletMax: 1023, mobileMax: 767 },
    // Carousel Navigation Group Mapping — deliberately separate from the
    // Scene Timeline above. The Hero now runs 4 independent Scenes (own
    // hold segment, own crossfade, own copy); this array only says which
    // Scenes share one visible Carousel nav item, and which Scene a click
    // on that item should land on — jumpTo is always the group's
    // *copy-bearing* Scene (see _scrollToScene). Every group is currently a
    // single Scene (Scenes 3/5 removed — see CONFIG.scenes/transitions
    // above), so each dot maps 1:1 to a Scene today, but this stays an
    // array of groups (not a flat Scene list) since that has been reshaped
    // before and may be again. Reshaping this mapping never touches
    // buildTimeline(), _resolve(), or the per-scene crossfade math in
    // _applyState() below.
    dotGroups: [
      { scenes: [1], jumpTo: 1 },
      { scenes: [2], jumpTo: 2 },
      { scenes: [4], jumpTo: 4 },
      { scenes: [6], jumpTo: 6 },
    ],
    // Seek-transport tuning (Section 17/18 of spec).
    seekToleranceSec: 0.15, // accept a seek landing within this of target
    seekFailThreshold: 3, // consecutive inaccurate/failed seeks -> Blob fallback
  };

  // Precompute the flat timeline (array of {type:'hold'|'scrub', ...}) once
  // per breakpoint mode, memoized — never recomputed inside the hot path.
  function buildTimeline(mobileFade) {
    var segs = [];
    for (var i = 0; i < CONFIG.scenes.length; i++) {
      segs.push({ type: 'hold', scene: CONFIG.scenes[i], weight: CONFIG.scenes[i].hold });
      var t = CONFIG.transitions[i];
      if (t) segs.push({ type: 'scrub', transition: t, index: i + 1, weight: mobileFade ? CONFIG.mobileTransitionVh : t.vh, fade: mobileFade });
    }
    var total = 0;
    for (var j = 0; j < segs.length; j++) total += segs[j].weight;
    var acc = 0;
    for (var k = 0; k < segs.length; k++) {
      segs[k].start = acc / total;
      acc += segs[k].weight;
      segs[k].end = acc / total;
    }
    return { segments: segs, totalVh: total };
  }

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // ---- module-level shared driver (mirrors scroll-word-reveal.js) -------
  var instances = new Set();
  var raf = 0;
  function scheduleTick() { if (!raf) raf = requestAnimationFrame(runTicks); }
  function runTicks() {
    raf = 0;
    instances.forEach(function (inst) { if (inst._active) inst._tick(); });
  }
  var listening = false;
  function listen(on) {
    if (on && !listening) {
      window.addEventListener('scroll', scheduleTick, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
      listening = true;
    } else if (!on && listening) {
      window.removeEventListener('scroll', scheduleTick);
      window.removeEventListener('resize', onResize);
      listening = false;
    }
  }
  var resizeRaf = 0;
  function onResize() {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(function () {
      resizeRaf = 0;
      instances.forEach(function (inst) { inst._onResize(); });
    });
  }

  // ---------------------------------------------------------------------
  // Every dynamic value (per-layer opacity, stage/copy transform, object-
  // position, total scroll height, cinematic-vs-reduced mode) is written
  // as a CSS custom property on <html> rather than as an inline style on
  // the Scene/Transition/Copy elements themselves.
  //
  // Why: this project's DC template runtime periodically re-syncs the
  // `style`/attribute values of elements it parsed out of the authored
  // .dc.html markup back to their authored baseline (observed directly —
  // an `el.style.opacity` written imperatively on a template-authored
  // child gets silently wiped within ~1-2s of an unrelated setState
  // elsewhere on the page). `document.documentElement` sits outside that
  // managed subtree and was confirmed stable across repeated runs, and
  // CSS custom properties inherit from it to every descendant normally,
  // so the actual opacity/transform rules live as static `var(...)`
  // references in the stylesheet below and only the *values* change.
  var root = document.documentElement;
  function setVar(name, value) { root.style.setProperty(name, value); }

  class HeroScrollWorldElement extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._tries = 0;
      this._scheduleInit();
    }
    _scheduleInit() {
      var self = this;
      requestAnimationFrame(function () {
        if (self._done) return;
        // Wait for the DC template runtime to have streamed the light-DOM
        // children in (same guard pattern as blur-reveal.js / scroll-word-reveal.js).
        if (!self.querySelector('[data-hsw-stage]') && self._tries++ < 80) return self._scheduleInit();
        self._init();
      });
    }

    _init() {
      this._done = true;
      this._active = false;
      this._lastLoadedIdx = -1;
      this._blobUrls = new Map(); // transition index -> blob url currently in use
      this._videoFail = new Map(); // transition index -> consecutive-bad-seek count
      this._lastOpacity = new Map(); // dedupe key -> last written value

      this.stage = this.querySelector('[data-hsw-stage]');
      this.reducedEl = this.querySelector('[data-hsw-reduced]');
      this.sceneEls = {};
      this.querySelectorAll('[data-hsw-scene]').forEach((el) => {
        this.sceneEls[el.getAttribute('data-hsw-scene')] = { wrap: el, img: el.querySelector('img') };
      });
      this.transitionEls = {};
      this.querySelectorAll('[data-hsw-transition]').forEach((el) => {
        this.transitionEls[el.getAttribute('data-hsw-transition')] = { wrap: el, video: el.querySelector('video') };
      });
      this.copyEls = {};
      // Character-level blur reveal, same effect as blur-reveal.js's own
      // IntersectionObserver-driven use elsewhere (e.g. the intro-section
      // headline) — but the Hero's copy blocks are pinned by the sticky
      // stage and never geometrically leave the viewport once entered, so
      // an IntersectionObserver alone would fire once and never again. Each
      // <blur-reveal manual> below (see markup) skips its own observer and
      // is instead driven from _applyState()'s opacity threshold crossing.
      this.copyReveal = {}; // scene n -> array of the *currently live* <blur-reveal> elements
      // A Scene's data-hsw-copy block isn't limited to one copy group — e.g.
      // front-layer-01 duplicated into front-layer-01-01 puts two
      // <blur-reveal> elements inside the same data-hsw-copy="1" block — so
      // every <blur-reveal> found inside reveals together, not just the
      // first one.
      this.copyRevealed = {}; // scene n -> bool, last-applied reveal state (dedupe trigger)
      this._copyObservers = [];
      this.querySelectorAll('[data-hsw-copy]').forEach((el) => {
        var n = el.getAttribute('data-hsw-copy');
        this.copyEls[n] = el;
        var brEls = Array.prototype.slice.call(el.querySelectorAll('blur-reveal'));
        if (!brEls.length) return;
        this.copyReveal[n] = brEls;
        // The DC template runtime's own hydration boot sequence can replace
        // this subtree once, early — same connect/disconnect churn
        // documented in disconnectedCallback below (observed directly: the
        // wrapper div and even the h1/p stay the very same node, but the
        // <blur-reveal> grandchild gets swapped for a brand-new, unrevealed
        // instance). Watch for that swap and re-point + re-apply whatever
        // reveal state was already decided, so an already-revealed scene
        // doesn't silently snap back to hidden and sit there until the next
        // scroll happens to re-trigger it. A same-node mutation (blur-reveal
        // rewriting its own children during its char split) leaves `fresh`
        // === the cached elements, so this is a no-op in the common case.
        var mo = new MutationObserver(() => {
          var fresh = Array.prototype.slice.call(el.querySelectorAll('blur-reveal'));
          var prev = this.copyReveal[n];
          var changed = fresh.length !== prev.length;
          if (!changed) {
            for (var fi = 0; fi < fresh.length; fi++) {
              if (fresh[fi] !== prev[fi]) { changed = true; break; }
            }
          }
          if (changed) {
            this.copyReveal[n] = fresh;
            if (this.copyRevealed[n]) fresh.forEach((b) => b.revealChars(true));
          }
        });
        mo.observe(el, { childList: true, subtree: true });
        this._copyObservers.push(mo);
      });
      this.skipEl = this.querySelector('[data-hsw-skip]');
      this.dotEls = {};
      this.querySelectorAll('[data-hsw-dot]').forEach((el) => {
        var n = +el.getAttribute('data-hsw-dot'); // 1-based Carousel group index, not a Scene number
        this.dotEls[n] = el;
        var group = CONFIG.dotGroups[n - 1];
        if (group) el.addEventListener('click', () => this._scrollToScene(group.jumpTo));
      });

      // Apply configured object-position now (static per breakpoint class,
      // not something that needs to move every frame).
      this._applyObjectPositions();

      this._mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      this._onMqChange = () => this._applyMode();
      if (this._mq.addEventListener) this._mq.addEventListener('change', this._onMqChange);
      else if (this._mq.addListener) this._mq.addListener(this._onMqChange);

      this._io = new IntersectionObserver((entries) => {
        var visible = entries[0].isIntersecting;
        this._active = visible && !this._reduced;
        if (this._active) { this._tick(); listen(true); }
      }, { rootMargin: '40% 0px 40% 0px', threshold: 0 });
      this._io.observe(this);

      instances.add(this);
      this._applyMode(); // decides cinematic vs reduced, builds timeline, sizes root
      // First paint must reflect current scroll position even before any
      // scroll/resize event fires (refresh mid-Hero, or Hero already
      // in view on load) and even if IntersectionObserver hasn't reported
      // in yet — geometry is available as soon as the element has layout.
      this._tick();
    }

    _applyObjectPositions() {
      var mobile = window.innerWidth <= CONFIG.breakpoints.mobileMax;
      CONFIG.scenes.forEach((s) => {
        setVar('--hsw-pos-' + s.n, mobile ? s.objectPosition.mobile : s.objectPosition.desktop);
      });
    }

    _applyMode() {
      var reduced = this._mq && this._mq.matches;
      this._reduced = reduced;
      root.setAttribute('data-hsw-mode', reduced ? 'reduced' : 'cinematic');
      if (reduced) {
        // Reduced motion: no Transition videos, no scrubbing, no extended
        // scroll distance, no Blob URLs ever created — the cinematic
        // subtree is display:none (see CSS, gated on [data-hsw-mode]) and
        // never touched again.
        this._active = false;
        return;
      }
      var mobile = window.innerWidth <= CONFIG.breakpoints.mobileMax;
      this._mobileFade = mobile;
      var built = buildTimeline(mobile);
      this._segments = built.segments;
      setVar('--hsw-total-vh', built.totalVh.toFixed(1));
      this._applyObjectPositions();
      this._lastLoadedIdx = -1; // force priority re-evaluation under new mode
    }

    _onResize() {
      if (this._reduced) return;
      var mobile = window.innerWidth <= CONFIG.breakpoints.mobileMax;
      if (mobile !== this._mobileFade) this._applyMode();
      else this._applyObjectPositions();
      this._tick();
    }

    // -- progress -> segment -------------------------------------------
    // The stage pins via native CSS `position: sticky` (see .hsw-stage in
    // 유락 메인.dc.html) — no JS-driven transform needed. This function only
    // computes the normalized 0..1 scroll progress for segment resolution.
    //
    // History: this used to emulate the pin itself (position:absolute +
    // scroll-event -> requestAnimationFrame -> translate3d), because a
    // page-wide wrapper's `overflow-x:hidden` was implicitly forcing
    // `overflow-y:auto` on it (an unrelated ancestor), which made *that*
    // div the nearest "scrolling mechanism" ancestor for position:sticky
    // purposes instead of the viewport, breaking native sticky everywhere
    // on the page. Fixed by changing that wrapper to `overflow-x:clip`
    // (clip does not establish a scroll container, unlike hidden/auto),
    // which restores native sticky — confirmed via ground-truth pixel
    // measurement (video capture + cross-correlation) that the JS-based
    // emulation had a real, reproducible one-frame visual lag proportional
    // to scroll delta (worse on fast/large scroll deltas), which native
    // sticky does not exhibit (0 anomalies across 177 frames tested,
    // vs. the emulation showing the exact scroll delta as a hitch on
    // every sampled burst).
    _positionAndProgress() {
      var r = this.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = r.height - vh;
      return total > 0 ? clamp01(-r.top / total) : 0;
    }

    _resolve(p) {
      var segs = this._segments;
      for (var i = 0; i < segs.length; i++) {
        var s = segs[i];
        if (p <= s.end || i === segs.length - 1) {
          var span = s.end - s.start;
          var local = span > 0 ? clamp01((p - s.start) / span) : (p >= s.end ? 1 : 0);
          return { seg: s, local: local, idx: i };
        }
      }
      return { seg: segs[segs.length - 1], local: 1, idx: segs.length - 1 };
    }

    _tick() {
      if (this._reduced || !this._segments) return;
      var p = this._positionAndProgress();
      var state = this._resolve(p);
      this._applyState(state);
      this._setPriority(state.idx);
    }

    // -- dot carousel: click-to-navigate ---------------------------------
    _scrollToScene(n) {
      if (!this._segments) return;
      var seg = null, segIdx = -1;
      for (var i = 0; i < this._segments.length; i++) {
        var s = this._segments[i];
        if (s.type === 'hold' && s.scene.n === n) { seg = s; segIdx = i; break; }
      }
      if (!seg) return;
      var r = this.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = r.height - vh;
      if (total <= 0) return;
      var span = seg.end - seg.start;
      // Land where the copy/panel entrance ease has actually finished
      // (opacity 1, translateY settled to 0, backdrop-filter fully
      // resolved against its final on-screen position) — the same state
      // scrolling straight through the seam reaches — rather than a few
      // percent past the seam while _applyState's inT is still ramping up
      // (see CONFIG.copyEase). Landing mid-ease was the cause of the panel
      // looking subtly different (still translated, backdrop-filter
      // sampling a slightly offset crop) between a Dot click and a natural
      // scroll arrival. Scene 1 (segIdx === 0) has no entrance ease at all
      // — _applyState forces inT = 1 unconditionally there since there is
      // no preceding Transition to ease in from — so it keeps landing just
      // inside the seam like before; every other Scene lands just past
      // local = CONFIG.copyEase instead.
      var targetLocal = segIdx === 0 ? Math.min(0.015, span * 0.2) / (span || 1) : clamp01(CONFIG.copyEase + 0.02);
      var targetProgress = clamp01(seg.start + targetLocal * span);
      var targetY = window.scrollY + r.top + total * targetProgress;
      // Instant jump, not behavior:'smooth'. The Hero's copy/panel opacity
      // (--hsw-copy-N, incl. the frame's backdrop-filter) is driven purely
      // by *actual* scroll position each tick — with a smooth animated
      // scroll, the destination Scene's real scroll position isn't reached
      // until the animation finishes, so its panel stays unblurred/
      // invisible for the ~1-2s the browser spends animating through every
      // Scene in between (measured: for a Scene near the end of a long
      // Hero, opacity sat at 0 for the first ~1.2s of the scroll and only
      // ramped to 1 in the last ~150ms). Jumping instantly means the
      // target progress is already correct on the very next _tick(), so
      // the panel/blur is applied immediately — no mid-transit gap to see
      // a "not blurred yet" state in, whether observed mid-scroll or after.
      window.scrollTo({ top: targetY, behavior: 'auto' });
      this._tick();
    }

    // -- visual application ----------------------------------------------
    _setOpacity(varName, v) {
      var prev = this._lastOpacity.get(varName);
      if (prev !== undefined && Math.abs(prev - v) < 0.004) return;
      this._lastOpacity.set(varName, v);
      setVar(varName, v.toFixed(3));
    }

    _applyState(state) {
      var seg = state.seg, local = state.local;
      var scenes = CONFIG.scenes;
      // Default: everything hidden, then turn on exactly what this segment needs.
      var sceneOpacity = {}; // n -> opacity
      var transitionOpacity = {}; // index -> opacity
      var copyOpacity = {}; // scene n -> {opacity, ty}
      var dotActive = {}; // n -> 0..1, dot-carousel indicator (see class comment)
      // Keep the skip affordance visible throughout the Hero sequence.
      // It leaves the viewport naturally when the pinned Hero stage releases.
      var skipOpacity = 1;

      if (seg.type === 'hold') {
        var n = seg.scene.n;
        sceneOpacity[n] = 1;
        dotActive[n] = 1;
        if (seg.scene.copy) {
          var ease = CONFIG.copyEase;
          // Segment 0 (Scene 1) has no preceding Transition to crossfade
          // in from — progress can't go below 0, so "the Scene is reached"
          // already true at local=0. Every other hold segment eases its
          // copy in after arriving via a Transition, which is what
          // produces the intended staggered image-then-headline reveal.
          var inT = state.idx === 0 ? 1 : clamp01(local / ease);
          // The last hold segment has no following Transition to crossfade
          // out into — if it carries copy, that copy should stay fully
          // readable for the rest of the hold and vanish only when the
          // whole pinned stage releases as one unit, not fade away first
          // and leave a bare pinned image before release. Scene 6 is that
          // last hold segment and does carry copy (the Carousel-4 {5,6}
          // exposure), so this keeps it fully visible right up to release.
          var outT = state.idx === this._segments.length - 1 ? 0 : clamp01((local - (1 - ease)) / ease);
          var vis = Math.min(inT, 1 - outT);
          vis = clamp01(vis);
          copyOpacity[n] = { opacity: vis, ty: lerp(CONFIG.copyTranslate, -CONFIG.copyTranslate * 0.5, vis) };
        }
      } else {
        var fromN = seg.transition.from, toN = seg.transition.to;
        // Dot indicator morphs across the *whole* Transition (unlike the
        // short image seam-crossfade below) — it's a position indicator,
        // not a visual layer, so a full linear hand-off between the two
        // dots reads better than snapping near either end.
        dotActive[fromN] = 1 - local;
        dotActive[toN] = local;
        var cf = CONFIG.seamCrossfade;
        var fadeInAmt = clamp01(local / cf);
        var fadeOutAmt = clamp01((local - (1 - cf)) / cf);
        sceneOpacity[fromN] = 1 - fadeInAmt;
        sceneOpacity[toN] = fadeOutAmt;

        if (seg.fade) {
          // Mobile fallback: plain still-to-still crossfade, no video.
          sceneOpacity[fromN] = 1 - local;
          sceneOpacity[toN] = local;
        } else {
          // Symmetric, progress-only crossfade at both seams: identical
          // visual output at a given `local` value regardless of scroll
          // direction (spec Section 5's forward/backward parity rule).
          transitionOpacity[seg.index] = Math.min(fadeInAmt, 1 - fadeOutAmt);
          this._driveVideo(seg.index, seg.transition, local);
        }
      }

      // Scene Timeline — unchanged. Scenes not mentioned this frame are
      // implicitly 0; write every scene each tick (cheap: 6 dirty-checked
      // var writes) rather than tracking a diff set, since "which scenes
      // are visible" changes shape between hold and scrub segments.
      for (var i = 0; i < scenes.length; i++) {
        var sn = scenes[i].n;
        this._setOpacity('--hsw-scene-' + sn, sceneOpacity[sn] || 0);
      }

      // Carousel Navigation Group Mapping — deliberately separate from the
      // Scene Timeline loop above (see CONFIG.dotGroups). A group's visible
      // "active" fill is the SUM of its member Scenes' dotActive values,
      // not a re-derived value: two adjacent Scenes' dotActive always sum
      // to exactly 1 across the Transition between them (see the hold /
      // scrub branches above), so this sum
      //   - would stay pinned at 1 for a Transition fully INSIDE one group,
      //     so that item never dims or flickers while its own Scenes hand
      //     off to each other — every group is currently a single Scene
      //     (see CONFIG.dotGroups comment), so this case doesn't arise
      //     today, but the sum still degrades correctly to a single term
      //     when it doesn't, and
      //   - reproduces the same smooth crossfade as a plain per-scene dot
      //     would for a Transition BETWEEN two groups (e.g. Scene2 ->
      //     Scene4), because dotActive[2] and dotActive[4] individually
      //     still ramp 1->0 / 0->1 across that Transition.
      // All 4 groups are always rendered (no sliding window / visibility
      // toggling — see CONFIG.dotGroups comment for why that was removed).
      var groups = CONFIG.dotGroups;
      for (var gi = 0; gi < groups.length; gi++) {
        var group = groups[gi];
        var gn = gi + 1; // 1-based, matches data-hsw-dot="1".."4" in markup
        var sum = 0;
        for (var gj = 0; gj < group.scenes.length; gj++) sum += dotActive[group.scenes[gj]] || 0;
        sum = clamp01(sum);
        this._setOpacity('--hsw-dot-' + gn, sum);
        var dotEl = this.dotEls[gn];
        if (dotEl) {
          // aria-current is a plain attribute (not `style`), unaffected by
          // the DC-runtime style-resync issue documented above.
          var isCurrent = sum > 0.5;
          var wasCurrent = dotEl.__hswCurrent === true;
          if (isCurrent !== wasCurrent) {
            dotEl.__hswCurrent = isCurrent;
            if (isCurrent) dotEl.setAttribute('aria-current', 'true');
            else dotEl.removeAttribute('aria-current');
          }
        }
      }
      for (var ti = 1; ti <= CONFIG.transitions.length; ti++) {
        this._setOpacity('--hsw-trans-' + ti, transitionOpacity[ti] || 0);
      }
      for (var ci = 0; ci < scenes.length; ci++) {
        var cn = scenes[ci].n;
        if (!this.copyEls[cn]) continue; // only Scenes with copy have a DOM node
        var st = copyOpacity[cn];
        var op = st ? st.opacity : 0;
        this._setOpacity('--hsw-copy-' + cn, op);
        var ty = st ? st.ty : CONFIG.copyTranslate;
        var tyKey = '--hsw-copy-' + cn + '-ty';
        var prevTy = this._lastOpacity.get(tyKey);
        if (prevTy === undefined || Math.abs(prevTy - ty) >= 0.4) {
          this._lastOpacity.set(tyKey, ty);
          setVar(tyKey, ty.toFixed(1) + 'px');
        }
        // Character blur reveal (see this.copyReveal comment in _init()),
        // layered on top of the wrapper fade above — fires once per
        // crossing of the "visible" threshold, not every frame.
        var brEls = this.copyReveal[cn];
        if (brEls && brEls.length) {
          var revealed = op > 0.02;
          if (revealed !== this.copyRevealed[cn]) {
            this.copyRevealed[cn] = revealed;
            for (var bi = 0; bi < brEls.length; bi++) brEls[bi].revealChars(revealed);
          }
        }
      }
      this._setOpacity('--hsw-skip', skipOpacity);
    }

    // -- lazy loading priority: current + immediate neighbor only --------
    _setPriority(idx) {
      if (idx === this._lastLoadedIdx) return;
      this._lastLoadedIdx = idx;
      var segs = this._segments;
      var want = new Set();
      for (var d = -1; d <= 1; d++) {
        var s = segs[idx + d];
        if (!s) continue;
        if (s.type === 'hold') want.add('img:' + s.scene.n);
        else if (!s.fade) want.add('vid:' + s.index);
      }
      want.forEach((key) => {
        if (key.indexOf('img:') === 0) this._ensureImageLoaded(+key.slice(4));
        else this._ensureVideoLoaded(+key.slice(4));
      });
    }

    _ensureImageLoaded(n) {
      var ref = this.sceneEls[n];
      if (!ref || !ref.img) return;
      if (!ref.img.getAttribute('src') && ref.img.dataset.src) ref.img.setAttribute('src', ref.img.dataset.src);
    }

    _ensureVideoLoaded(index) {
      var ref = this.transitionEls[index];
      if (!ref || !ref.video) return;
      var v = ref.video;
      if (!v.getAttribute('src') && v.dataset.src) {
        v.setAttribute('src', v.dataset.src);
        v.preload = 'auto';
        v.load();
      }
    }

    // -- video scrub / seek transport (Section 17/18) ---------------------
    // Direct-seek policy: use the <video src> URL as-is and drive
    // currentTime directly. A seek is considered to have "failed" for a
    // transition when, after its `seeked` event fires, currentTime is not
    // within CONFIG.seekToleranceSec of the requested target, or when the
    // video fires an `error` event. After CONFIG.seekFailThreshold
    // consecutive failures *for that specific transition*, that transition
    // (only that one) switches to a lazily-fetched Blob URL and retries.
    _driveVideo(index, transition, local) {
      var ref = this.transitionEls[index];
      if (!ref || !ref.video) return;
      var v = ref.video;
      this._ensureVideoLoaded(index);
      var dur = v.duration;
      if (!dur || !isFinite(dur)) {
        // Metadata not ready yet — remember the target, apply on loadedmetadata.
        v.__hswPendingLocal = local;
        if (!v.__hswMetaBound) {
          v.__hswMetaBound = true;
          v.addEventListener('loadedmetadata', () => {
            if (v.__hswPendingLocal != null) this._seekTo(index, v, v.__hswPendingLocal * v.duration);
          });
        }
        return;
      }
      this._seekTo(index, v, clamp01(local) * dur);
    }

    _seekTo(index, v, time) {
      time = Math.max(0, Math.min(v.duration || time, time));
      if (v.seeking) {
        // Coalesce: only the newest target survives while a seek is in flight.
        v.__hswPendingTime = time;
        return;
      }
      if (Math.abs(v.currentTime - time) < 0.008) return; // already there
      this._beginSeek(index, v, time);
    }

    _beginSeek(index, v, time) {
      v.__hswTargetTime = time;
      if (!v.__hswSeekBound) {
        v.__hswSeekBound = true;
        v.addEventListener('seeked', () => this._onSeeked(index, v));
        v.addEventListener('error', () => this._onVideoError(index, v));
      }
      try { v.currentTime = time; } catch (e) { this._onVideoError(index, v); }
    }

    _onSeeked(index, v) {
      var target = v.__hswTargetTime;
      var ok = target == null || Math.abs(v.currentTime - target) <= CONFIG.seekToleranceSec;
      var fails = this._videoFail.get(index) || 0;
      fails = ok ? 0 : fails + 1;
      this._videoFail.set(index, fails);
      if (!ok && fails >= CONFIG.seekFailThreshold && v.__hswMode !== 'blob') {
        this._switchToBlob(index, v);
        return;
      }
      if (v.__hswPendingTime != null) {
        var next = v.__hswPendingTime;
        v.__hswPendingTime = null;
        if (Math.abs(v.currentTime - next) >= 0.008) this._beginSeek(index, v, next);
      }
    }

    _onVideoError(index, v) {
      var fails = (this._videoFail.get(index) || 0) + CONFIG.seekFailThreshold; // escalate immediately
      this._videoFail.set(index, fails);
      if (v.__hswMode !== 'blob') this._switchToBlob(index, v);
      // If the Blob path also fails, the poster (still first frame) stays
      // visible via the scene-still crossfade underneath — never a blank Hero.
    }

    _switchToBlob(index, v) {
      if (v.__hswBlobPending || v.__hswMode === 'blob') return;
      v.__hswBlobPending = true;
      var srcUrl = v.dataset.src;
      if (!srcUrl) { v.__hswBlobPending = false; return; }
      var wantTime = v.__hswTargetTime || 0;
      fetch(srcUrl, { credentials: 'same-origin' })
        .then((res) => { if (!res.ok) throw new Error('bad status'); return res.blob(); })
        .then((blob) => {
          var url = URL.createObjectURL(blob);
          var old = this._blobUrls.get(index);
          this._blobUrls.set(index, url);
          v.src = url;
          v.__hswMode = 'blob'; // only flip mode on a *successful* swap
          v.__hswBlobPending = false;
          v.preload = 'auto';
          v.load();
          var onReady = () => {
            v.removeEventListener('loadedmetadata', onReady);
            this._videoFail.set(index, 0);
            this._beginSeek(index, v, wantTime);
            if (old) { URL.revokeObjectURL(old); }
          };
          v.addEventListener('loadedmetadata', onReady);
        })
        .catch(() => {
          // Same-origin/CORS failure or network error while fetching the
          // Blob: stay on the direct URL + poster (never a blank Hero),
          // reset the fail counter so ongoing seeks can naturally
          // re-trigger another attempt later instead of being permanently
          // locked out by a one-time fetch failure.
          v.__hswBlobPending = false;
          this._videoFail.set(index, 0);
        });
    }

    disconnectedCallback() {
      // The DC runtime's own boot sequence connects and disconnects this
      // element in quick succession before _scheduleInit()'s rAF-deferred
      // _init() has necessarily run yet (observed directly: disconnect can
      // fire ~20ms after connect, well inside one animation frame). Every
      // field below is only created in _init() — bail out if it never ran,
      // there is nothing to clean up yet.
      if (!this._done) return;
      instances.delete(this);
      if (!instances.size) listen(false);
      if (this._io) { this._io.disconnect(); this._io = null; }
      if (this._copyObservers) { this._copyObservers.forEach((mo) => mo.disconnect()); this._copyObservers = []; }
      if (this._mq) {
        if (this._mq.removeEventListener) this._mq.removeEventListener('change', this._onMqChange);
        else if (this._mq.removeListener) this._mq.removeListener(this._onMqChange);
      }
      this._blobUrls.forEach((url) => { try { URL.revokeObjectURL(url); } catch (e) {} });
      this._blobUrls.clear();
      this._active = false;
      this._done = false;
    }
  }

  customElements.define('hero-scrollworld', HeroScrollWorldElement);
})();
