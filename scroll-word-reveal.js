(function () {
  if (customElements.get('scroll-word-reveal')) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var instances = new Set();
  var raf = 0, listening = false;

  function onScroll() { if (!raf) raf = requestAnimationFrame(update); }
  function update() {
    raf = 0;
    var vh = window.innerHeight;
    var rects = new Map();
    instances.forEach(function (inst) {
      var sec = inst._section;
      if (!sec || !inst._words) return;
      var r = rects.get(sec);
      if (!r) { r = sec.getBoundingClientRect(); rects.set(sec, r); }
      // 0 when section top enters at 95% of viewport, 1 when the section is centered
      var start = vh * 0.95;
      var end = vh * 0.5 - r.height / 2;
      var p = (start - r.top) / (start - end);
      if (p < 0) p = 0; else if (p > 1) p = 1;
      inst._apply(p);
    });
  }
  function listen(on) {
    if (on && !listening) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      listening = true;
    } else if (!on && listening) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      listening = false;
    }
  }

  class ScrollWordReveal extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._tries = 0;
      this._schedule();
    }
    _schedule() {
      var self = this;
      requestAnimationFrame(function () {
        if (self._done) return;
        if (!self.childNodes.length && self._tries++ < 60) return self._schedule();
        self._init();
      });
    }
    _init() {
      this._done = true;
      var label = (this.textContent || '').replace(/\s+/g, ' ').trim();
      if (label) this.setAttribute('aria-label', label);
      if (reduce) return; // full readable static text, no split, no blur

      this._t0 = parseFloat(this.getAttribute('t0') || '0');
      this._t1 = parseFloat(this.getAttribute('t1') || '1');
      this._section = this.closest('[data-swr-section]') || this.parentElement;

      var words = [];
      var out = document.createDocumentFragment();
      var walk = function (nodes, target) {
        nodes.forEach(function (node) {
          if (node.nodeType === 3) {
            var text = node.nodeValue;
            if (!text) return;
            text.split(/(\s+)/).forEach(function (tok) {
              if (!tok) return;
              if (/^\s+$/.test(tok)) { target.appendChild(document.createTextNode(' ')); return; }
              var sp = document.createElement('span');
              sp.style.cssText = 'display:inline-block;white-space:nowrap;opacity:.24;filter:blur(4px);';
              sp.textContent = tok;
              words.push(sp);
              target.appendChild(sp);
            });
          } else if (node.nodeType === 1) {
            var clone = node.cloneNode(false);
            if (node.tagName !== 'BR') walk(Array.from(node.childNodes), clone);
            target.appendChild(clone);
          }
        });
      };
      walk(Array.from(this.childNodes), out);

      var holder = document.createElement('span');
      holder.setAttribute('aria-hidden', 'true');
      holder.style.cssText = 'display:inline;';
      holder.appendChild(out);
      this.textContent = '';
      this.appendChild(holder);

      this._words = words;
      this._last = new Array(words.length).fill(-1);
      instances.add(this);
      listen(true);
      onScroll();
    }
    _apply(p) {
      // map section progress into this element's window
      var q = (p - this._t0) / (this._t1 - this._t0);
      if (q < 0) q = 0; else if (q > 1) q = 1;
      var n = this._words.length;
      if (!n) return;
      var K = Math.max(2, Math.min(8, Math.round(n / 3))); // overlap width in word units
      var scaled = q * (n + K);
      for (var i = 0; i < n; i++) {
        var local = (scaled - i) / K;
        if (local < 0) local = 0; else if (local > 1) local = 1;
        var qz = Math.round(local * 64); // quantize to skip redundant writes
        if (qz === this._last[i]) continue;
        this._last[i] = qz;
        var l = qz / 64;
        var sp = this._words[i];
        sp.style.opacity = (0.24 + 0.76 * l).toFixed(3);
        sp.style.filter = l >= 1 ? 'none' : 'blur(' + (4 * (1 - l)).toFixed(2) + 'px)';
      }
    }
    disconnectedCallback() {
      instances.delete(this);
      if (!instances.size) listen(false);
    }
  }
  customElements.define('scroll-word-reveal', ScrollWordReveal);
})();
