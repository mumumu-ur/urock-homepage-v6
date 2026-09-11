#!/usr/bin/env node
// Swap every .png reference converted by convert-to-webp.js to its new
// .webp counterpart inside index.html. Reads the exact as-they-appear
// strings from scripts/webp-convert-list-raw.txt (produced alongside
// webp-convert-list.txt, before URL-decoding/./ stripping) so this can't
// mismatch on %20-encoded or ./-prefixed paths.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const raw = fs.readFileSync(path.join(ROOT, 'scripts', 'webp-convert-list-raw.txt'), 'utf8')
  .split('\n').map((l) => l.trim()).filter(Boolean);

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
let total = 0;
for (const oldRef of raw) {
  if (!oldRef.endsWith('.png')) continue;
  const newRef = oldRef.slice(0, -4) + '.webp';
  const count = html.split(oldRef).length - 1;
  if (count === 0) { console.warn('[not found]', oldRef); continue; }
  html = html.split(oldRef).join(newRef);
  total += count;
  console.log(count.toString().padStart(2), 'x', oldRef, '->', newRef);
}
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('---');
console.log('Total replacements:', total);
