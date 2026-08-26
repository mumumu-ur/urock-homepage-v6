const { test } = require('@playwright/test');

test('measure Hero vertical stability while scrolling', async ({ page }) => {
  const mediaResponses = [];
  const requestFailures = [];
  page.on('response', response => {
    if (/assets\/hero\/.*\.(mp4|webp)/.test(response.url())) mediaResponses.push({ url: response.url(), status: response.status() });
  });
  page.on('requestfailed', request => requestFailures.push({ url: request.url(), error: request.failure()?.errorText }));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  await page.locator('hero-scrollworld').waitFor({ state: 'visible' });
  await page.waitForFunction(() => document.querySelector('hero-scrollworld')?._segments?.length);

  await page.evaluate(() => {
    const hero = document.querySelector('hero-scrollworld');
    const stage = hero.querySelector('[data-hsw-stage]');
    const root = document.documentElement;
    const samples = [];
    const events = [];
    const layoutShifts = [];
    let frame = 0;
    let lastScrollEventAt = -Infinity;
    let lastY = scrollY;

    new PerformanceObserver(list => {
      for (const e of list.getEntries()) {
        if (!e.hadRecentInput) layoutShifts.push({ t: e.startTime, value: e.value });
      }
    }).observe({ type: 'layout-shift', buffered: true });

    addEventListener('scroll', () => {
      lastScrollEventAt = performance.now();
      events.push({ type: 'scroll', t: lastScrollEventAt, y: scrollY });
    }, { passive: true });
    addEventListener('resize', () => events.push({ type: 'resize', t: performance.now(), w: innerWidth, h: innerHeight }), { passive: true });

    const sample = t => {
      const wr = hero.getBoundingClientRect();
      const sr = stage.getBoundingClientRect();
      const total = wr.height - innerHeight;
      const progress = total > 0 ? Math.max(0, Math.min(1, -wr.top / total)) : 0;
      const state = hero._segments ? hero._resolve(progress) : null;
      const scenes = [...hero.querySelectorAll('[data-hsw-scene]')].map(el => ({
        n: +el.dataset.hswScene,
        opacity: +getComputedStyle(el).opacity,
        imageOpacity: +getComputedStyle(el.querySelector('img')).opacity,
      }));
      const transitions = [...hero.querySelectorAll('[data-hsw-transition]')].map(el => {
        const v = el.querySelector('video');
        return {
          n: +el.dataset.hswTransition,
          opacity: +getComputedStyle(el).opacity,
          videoOpacity: +getComputedStyle(v).opacity,
          currentTime: v.currentTime,
          duration: Number.isFinite(v.duration) ? v.duration : null,
          seeking: v.seeking,
          readyState: v.readyState,
          src: v.currentSrc,
        };
      });
      const stageYText = getComputedStyle(root).getPropertyValue('--hsw-stage-y').trim();
      const stageY = parseFloat(stageYText) || 0;
      const idealStageY = Math.min(Math.max(-wr.top, 0), Math.max(0, wr.height - innerHeight));
      samples.push({
        frame: frame++, t, y: scrollY, dy: scrollY - lastY,
        sinceScrollEvent: t - lastScrollEventAt,
        wrapper: { top: wr.top, bottom: wr.bottom, height: wr.height },
        stage: { top: sr.top, bottom: sr.bottom, height: sr.height },
        viewportHeight: innerHeight,
        visualViewportHeight: visualViewport?.height ?? null,
        scrollHeight: document.documentElement.scrollHeight,
        stageYText, stageY, idealStageY,
        stageYLag: idealStageY - stageY,
        stickyError: sr.top,
        transform: getComputedStyle(stage).transform,
        position: getComputedStyle(stage).position,
        top: getComputedStyle(stage).top,
        progress,
        activeScene: scenes.filter(x => x.opacity > 0.01),
        activeTransition: transitions.filter(x => x.opacity > 0.01),
      });
      lastY = scrollY;
      if (!window.__diagStop) requestAnimationFrame(sample);
    };
    window.__heroDiag = { samples, events, layoutShifts };
    requestAnimationFrame(sample);
  });

  // Exercise every hold/scrub boundary, then produce discrete wheel bursts
  // inside each scrub where a one-frame JS pin lag is easiest to expose.
  const metrics = await page.evaluate(() => {
    const h = document.querySelector('hero-scrollworld');
    const r = h.getBoundingClientRect();
    return { top: scrollY + r.top, range: r.height - innerHeight, segments: h._segments.map(s => ({ start: s.start, end: s.end, type: s.type })) };
  });
  for (const seg of metrics.segments) {
    const points = [seg.start + (seg.end - seg.start) * 0.05, seg.start + (seg.end - seg.start) * 0.5, seg.end - (seg.end - seg.start) * 0.05];
    for (const p of points) {
      await page.evaluate(y => scrollTo(0, y), metrics.top + metrics.range * p);
      await page.waitForTimeout(70);
      await page.mouse.wheel(0, 137);
      await page.waitForTimeout(70);
      await page.mouse.wheel(0, -83);
      await page.waitForTimeout(70);
    }
  }
  // Natural continuous wheel sequence across the middle of the Hero.
  await page.evaluate(y => scrollTo(0, y), metrics.top + metrics.range * 0.32);
  for (let i = 0; i < 80; i++) {
    await page.mouse.wheel(0, 43);
    await page.waitForTimeout(10);
  }
  await page.waitForTimeout(500);

  const exitProbe = [];
  for (const offset of [-20, -1, 0, 1, 20]) {
    await page.evaluate(y => scrollTo(0, y), metrics.top + metrics.range + offset);
    await page.waitForTimeout(50);
    exitProbe.push(await page.evaluate(offset => {
      const h = document.querySelector('hero-scrollworld');
      const s = h.querySelector('[data-hsw-stage]');
      const wr = h.getBoundingClientRect();
      const sr = s.getBoundingClientRect();
      return { offset, y: scrollY, wrapperTop: wr.top, wrapperBottom: wr.bottom, stageTop: sr.top, stageBottom: sr.bottom, stageY: getComputedStyle(document.documentElement).getPropertyValue('--hsw-stage-y').trim() };
    }, offset));
  }

  const result = await page.evaluate(() => {
    window.__diagStop = true;
    const d = window.__heroDiag;
    const pinned = d.samples.filter(s => s.wrapper.top < 0 && s.wrapper.bottom > s.viewportHeight);
    const moving = pinned.filter(s => s.dy !== 0);
    const anomalous = moving.filter(s => Math.abs(s.stickyError) > 0.25 || Math.abs(s.stageYLag) > 0.25);
    const heightValues = [...new Set(d.samples.map(s => `${s.wrapper.height}|${s.viewportHeight}|${s.visualViewportHeight}|${s.scrollHeight}`))];
    const maxAbs = (arr, key) => arr.reduce((m, s) => Math.max(m, Math.abs(s[key])), 0);
    const recovery = anomalous.map(s => {
      const next = d.samples.find(n => n.frame > s.frame && n.y === s.y);
      return next ? { inputFrame: s.frame, inputError: s.stickyError, recoveredFrame: next.frame, recoveredError: next.stickyError, ms: next.t - s.t } : null;
    }).filter(Boolean);
    const errorHistogram = [...new Set(anomalous.map(s => s.stickyError))].sort((a,b) => a-b);
    const videoStates = [...document.querySelectorAll('[data-hsw-transition] video')].map((v, i) => ({
      n: i + 1, currentTime: v.currentTime, duration: Number.isFinite(v.duration) ? v.duration : null,
      seeking: v.seeking, readyState: v.readyState, networkState: v.networkState,
      error: v.error ? { code: v.error.code, message: v.error.message } : null, src: v.currentSrc,
    }));
    return {
      sampleCount: d.samples.length,
      movingSampleCount: moving.length,
      anomalyCount: anomalous.length,
      maxStickyError: maxAbs(moving, 'stickyError'),
      maxStageYLag: maxAbs(moving, 'stageYLag'),
      errorHistogram,
      recoveryCount: recovery.length,
      recovery: recovery.slice(0, 12),
      heightValues,
      resizeEvents: d.events.filter(e => e.type === 'resize'),
      layoutShifts: d.layoutShifts,
      anomalies: anomalous.slice(0, 12),
      videoStates,
      first: d.samples.slice(0, 3),
      last: d.samples.slice(-3),
    };
  });
  result.mediaResponses = mediaResponses;
  result.requestFailures = requestFailures;
  result.exitProbe = exitProbe;
  console.log('HERO_DIAG_RESULT=' + JSON.stringify(result));
});
