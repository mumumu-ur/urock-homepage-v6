(function () {
  if (customElements.get('blur-reveal')) return;

  class BlurReveal extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._tries = 0;
      this._schedule();
    }
    _schedule() {
      requestAnimationFrame(() => {
        if (this._done) return;
        if (!this.childNodes.length && this._tries++ < 60) return this._schedule();
        this._init();
      });
    }
    _init() {
      this._done = true;
      const delay = parseFloat(this.getAttribute('delay') || '0');
      const speedReveal = parseFloat(this.getAttribute('speed-reveal') || '1.5');
      const speedSegment = parseFloat(this.getAttribute('speed-segment') || '0.5');
      const once = this.getAttribute('once') !== 'false';
      // Manual mode: skip the IntersectionObserver below and let an
      // external driver call revealChars(on) instead — for text that never
      // leaves the viewport on its own (e.g. pinned by a sticky ancestor,
      // like the Hero ScrollWorld's per-scene copy in hero-scrollworld.js),
      // where geometric intersection can't detect a per-scene re-entry.
      const manual = this.hasAttribute('manual');
      this._delay = delay;
      this._stagger = 0.03 / speedReveal;
      this._dur = 0.3 / speedSegment;
      this._once = once;
      this._reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const label = (this.textContent || '').replace(/\s+/g, ' ').trim();
      if (label) this.setAttribute('aria-label', label);

      const chars = [];
      const out = document.createDocumentFragment();
      const walk = (nodes, target) => {
        nodes.forEach((node) => {
          if (node.nodeType === 3) {
            const text = node.nodeValue;
            if (!text) return;
            text.split(/(\s+)/).forEach((tok) => {
              if (!tok) return;
              if (/^\s+$/.test(tok)) {
                const sp = document.createElement('span');
                sp.className = 'br-char';
                sp.style.cssText = 'display:inline-block;white-space:pre;';
                sp.textContent = tok;
                chars.push(sp);
                target.appendChild(sp);
                return;
              }
              const word = document.createElement('span');
              word.style.cssText = 'display:inline-block;white-space:nowrap;';
              Array.from(tok).forEach((ch) => {
                const sp = document.createElement('span');
                sp.className = 'br-char';
                sp.style.cssText = 'display:inline-block;';
                sp.textContent = ch;
                chars.push(sp);
                word.appendChild(sp);
              });
              target.appendChild(word);
            });
          } else if (node.nodeType === 1) {
            const clone = node.cloneNode(false);
            if (node.tagName !== 'BR') walk(Array.from(node.childNodes), clone);
            target.appendChild(clone);
          }
        });
      };
      walk(Array.from(this.childNodes), out);

      const holder = document.createElement('span');
      holder.setAttribute('aria-hidden', 'true');
      holder.style.cssText = 'display:inline;';
      holder.appendChild(out);
      this.textContent = '';
      this.appendChild(holder);

      chars.forEach((sp) => {
        sp.style.opacity = '0';
        sp.style.filter = 'blur(12px)';
        sp.style.transform = 'translateY(10px)';
        sp.style.willChange = 'opacity, filter, transform';
      });
      this._chars = chars;

      if (manual) {
        if (this._pendingReveal !== undefined) {
          this._show(this._pendingReveal);
          this._pendingReveal = undefined;
        }
        return;
      }

      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            this._show(true);
            if (once) io.disconnect();
          } else if (!once) {
            this._show(false);
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
      io.observe(this);
      this._io = io;
    }
    _show(on) {
      const chars = this._chars, dur = this._dur, stagger = this._stagger, delay = this._delay, reduce = this._reduce;
      chars.forEach((sp, i) => {
        sp.style.transition = reduce
          ? 'none'
          : 'opacity ' + dur + 's ease-out, filter ' + dur + 's ease-out, transform ' + dur + 's ease-out';
        sp.style.transitionDelay = reduce ? '0s' : (delay + (on ? i : chars.length - 1 - i) * stagger) + 's';
        sp.style.opacity = on ? '1' : '0';
        sp.style.filter = on ? 'blur(0px)' : 'blur(12px)';
        sp.style.transform = on ? 'translateY(0)' : 'translateY(10px)';
      });
    }
    // Public API for `manual` mode — see the comment in _init() above.
    // Safe to call before the char-split has run (e.g. the caller's own
    // init race against this element's _schedule() retry loop above): the
    // requested state is queued and applied as soon as _init() completes.
    revealChars(on) {
      if (!this._done || !this._chars) { this._pendingReveal = on; return; }
      this._show(on);
    }
    disconnectedCallback() { if (this._io) this._io.disconnect(); }
  }

  customElements.define('blur-reveal', BlurReveal);
})();
