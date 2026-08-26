#!/usr/bin/env node
// Reusable Hero media-optimization pass.
//
// STATUS: not executed against the current assets. ffmpeg/ffprobe are not
// installed in this environment (checked via `where`/`Get-Command` — see
// the implementation completion report), and this project's package.json
// intentionally ships zero dependencies ("no dependencies — plain Node so
// `npm run dev` works with nothing to install"), so no encoder was
// installed to work around that. This script documents the exact,
// reviewed settings to run once ffmpeg is available on PATH; it will
// refuse to run (and tell you so) rather than silently no-op or fetch a
// binary on its own.
//
// Master assets live in assets-source/hero/ (byte-identical copies of
// assets/hero/ as of this pass — nothing has been transcoded yet, so
// "master" and "runtime" are currently the same bytes). This script
// always reads from assets-source/hero/ and writes to assets/hero/, so
// re-running it never risks overwriting the only copy of a master.
//
// Usage (once ffmpeg + ffprobe are on PATH):
//   node scripts/optimize-hero-media.js
//
// What it does per assets-source/hero/hero-transition-*.mp4:
//   - strip audio                          (-an)
//   - transcode to H.264 / yuv420p         (-c:v libx264 -pix_fmt yuv420p)
//   - keyframe every ~12 frames (~0.5s @24fps) for smooth scroll-scrubbing
//     seeks, instead of the source's sparse 1-6 keyframes per ~5s clip
//     (-g 12 -keyint_min 12 -sc_threshold 0)
//   - move the moov atom to the front for HTTP progressive/range seeking
//     (-movflags +faststart) — two of the six source videos
//     (hero-transition-01-02.mp4, hero-transition-03-04.mp4) are NOT
//     faststart today, which is the most likely reason direct-URL seeking
//     would be unreliable for exactly those two in the browser.
//   - CRF-based quality target (-crf 20), not a fixed low bitrate, so
//     "avoid excessive compression" / "avoid visible banding" stay
//     checkable per-file rather than assumed.
//   - hero-transition-03-04.mp4 is HEVC (hvc1) source today, ~1920x1080,
//     ~20.8Mbps, WITH an audio track — it gets the same treatment (audio
//     stripped, re-encoded to H.264) so every runtime Transition is a
//     uniform, broadly-seekable codec.
//
// What it deliberately does NOT do:
//   - does not touch the *.webp Scene stills (see convertScenesIfNeeded
//     below — it only fires if a PNG/JPG source ever replaces a Scene;
//     the current Scene sources are already .webp, so there's nothing to
//     convert).
//   - does not produce WebM. Per spec, WebM is only generated after real
//     testing shows a size/perf win with preserved quality — that
//     comparison hasn't been run.
//   - does not delete or modify anything in assets-source/hero/.

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'assets-source', 'hero');
const OUT_DIR = path.join(ROOT, 'assets', 'hero');

const TRANSITIONS = [
  'hero-transition-01-02.mp4',
  'hero-transition-02-03.mp4',
  'hero-transition-03-04.mp4',
  'hero-transition-04-05.mp4',
  'hero-transition-05-06.mp4',
  'hero-transition-06-07.mp4',
];

function hasBinary(name) {
  try {
    execFileSync(process.platform === 'win32' ? 'where' : 'which', [name], { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function main() {
  const okFfmpeg = hasBinary('ffmpeg');
  const okFfprobe = hasBinary('ffprobe');
  if (!okFfmpeg || !okFfprobe) {
    console.error(
      '[optimize-hero-media] ffmpeg=' + okFfmpeg + ' ffprobe=' + okFfprobe +
      ' — both are required and at least one is missing on PATH. Refusing to run.\n' +
      'Install ffmpeg (which bundles ffprobe) and re-run this script; nothing was changed.'
    );
    process.exit(1);
  }

  for (const file of TRANSITIONS) {
    const inPath = path.join(SRC_DIR, file);
    const outPath = path.join(OUT_DIR, file);
    if (!fs.existsSync(inPath)) {
      console.warn('[optimize-hero-media] skipping missing master: ' + inPath);
      continue;
    }
    console.log('[optimize-hero-media] ' + file);
    execFileSync('ffprobe', ['-v', 'error', '-show_format', '-show_streams', inPath], { stdio: 'inherit' });
    const tmpOut = outPath + '.tmp.mp4';
    execFileSync('ffmpeg', [
      '-y', '-i', inPath,
      '-an', // remove audio
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
      '-crf', '20', '-preset', 'slow',
      '-g', '12', '-keyint_min', '12', '-sc_threshold', '0',
      '-movflags', '+faststart',
      tmpOut,
    ], { stdio: 'inherit' });
    fs.renameSync(tmpOut, outPath);
  }

  console.log('[optimize-hero-media] done. Compare file sizes and re-run the seam/seek verification pass before shipping.');
}

// Kept for completeness / future Scene sources — only runs if a Scene
// master is ever supplied as .png/.jpg/.jpeg instead of .webp. Today all
// six Scene masters are already .webp, so this is a no-op.
function convertScenesIfNeeded() {
  const scenes = fs.readdirSync(SRC_DIR).filter((f) => /^hero-scene-\d\d\.(png|jpe?g)$/i.test(f));
  if (!scenes.length) return;
  for (const file of scenes) {
    const outName = file.replace(/\.(png|jpe?g)$/i, '.webp');
    console.log('[optimize-hero-media] converting Scene master ' + file + ' -> ' + outName);
    execFileSync('ffmpeg', ['-y', '-i', path.join(SRC_DIR, file), '-q:v', '82', path.join(OUT_DIR, outName)], { stdio: 'inherit' });
  }
}

main();
convertScenesIfNeeded();
