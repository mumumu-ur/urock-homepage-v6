#!/usr/bin/env node
// One-off PNG -> WebP conversion pass for every image actually referenced
// by index.html (see the accompanying git commit for the exact list this
// was run against). Two tiers:
//   - RESIZE_MAP: displayed far smaller than source (confirmed against the
//     CSS that actually renders them) -> resized down to a sane ~2x-retina
//     ceiling AND re-encoded, since format alone leaves the oversized-
//     decode cost on the table.
//   - everything else -> format conversion only, dimensions untouched, so
//     zero layout/visual-size risk.
// Quality tiers: photographic (news cards, section backgrounds) -> 82;
// graphic/logo/document (crisp lines, text, flat fills) -> 90; the Hero
// screen-blend objects -> 90 (banding on a glow layer is very visible at
// lower quality, so it gets the higher tier despite being "photographic").
// Originals are left in place; this script only writes new .webp files
// next to them. Deleting the old .png files and updating index.html's
// references is a separate, explicit step after visual verification.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const RESIZE_MAP = {
  'assets/hero/object-01.png': 700,
  'assets/hero/object-02.png': 460,
};

const HIGH_QUALITY = new Set([
  'assets/hero/object-01.png',
  'assets/hero/object-02.png',
  'assets/cert-report-ko.png',
  'assets/clients-logos-6x5.png',
  'assets/monitor-frame-sm.png',
  'assets/global-map-dots-lite.png',
  'assets/service-safe-erase.png',
  'assets/consult-forensic-analysis-thumb.png',
  'assets/consult-security-audit-thumb-v4-glow.png',
  'assets/consult-security-training-thumb-v2-glow.png',
  'assets/dfas-discovery-thumb.png',
  'assets/dfas-edge-thumb.png',
  'assets/dfas-go-thumb-v2-glow.png',
  'assets/dfas-pro-one-thumb.png',
  'assets/gatemanager-pro-thumb-glow.png',
  'assets/gatemanager-thumb-glow.png',
  'assets/msecumanager-g-thumb.png',
  'assets/msecumanager-p-thumb.png',
  'assets/msecumanager-s-thumb.png',
  'assets/quick-icons/audit.png',
  'assets/quick-icons/consulting.png',
  'assets/quick-icons/investigation.png',
  'assets/quick-icons/it-infra.png',
  'assets/quick-icons/legal.png',
  'assets/quick-icons/security.png',
  'uploads/DFAS Arc_white.png',
  'uploads/DFAS Discovery_white.png',
  'uploads/DFAS Edge_white_AI.png',
  'uploads/DFAS Go_white.png',
  'uploads/DFAS Pro_white_one.png',
  'uploads/gatemanager_pro_asset.png',
  'uploads/gatemanager_white.png',
]);

async function main() {
  const listPath = path.join(ROOT, 'scripts', 'webp-convert-list.txt');
  const files = fs.readFileSync(listPath, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);

  let totalBefore = 0, totalAfter = 0;
  const rows = [];

  for (const rel of files) {
    const inPath = path.join(ROOT, rel);
    const outPath = inPath.replace(/\.png$/i, '.webp');
    if (!fs.existsSync(inPath)) { console.warn('[skip] missing:', rel); continue; }

    const quality = HIGH_QUALITY.has(rel) ? 90 : 82;
    let img = sharp(inPath);
    const targetWidth = RESIZE_MAP[rel];
    if (targetWidth) {
      const meta = await img.metadata();
      if (meta.width > targetWidth) img = img.resize({ width: targetWidth });
    }
    await img.webp({ quality }).toFile(outPath);

    const before = fs.statSync(inPath).size;
    const after = fs.statSync(outPath).size;
    totalBefore += before;
    totalAfter += after;
    rows.push({ rel, before, after, pct: (100 * (1 - after / before)).toFixed(0) });
  }

  rows.sort((a, b) => b.before - a.before);
  for (const r of rows) {
    console.log(
      r.rel.padEnd(42),
      (r.before / 1024).toFixed(0).padStart(6) + 'KB ->',
      (r.after / 1024).toFixed(0).padStart(6) + 'KB',
      '(-' + r.pct + '%)'
    );
  }
  console.log('---');
  console.log('TOTAL', (totalBefore / 1024 / 1024).toFixed(2) + 'MB ->', (totalAfter / 1024 / 1024).toFixed(2) + 'MB',
    '(-' + (100 * (1 - totalAfter / totalBefore)).toFixed(0) + '%)');
}

main().catch((e) => { console.error(e); process.exit(1); });
