// Minimal static dev server for the UROCK homepage (.dc.html + support.js runtime).
// No dependencies — plain Node so `npm run dev` works with nothing to install.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT = path.resolve(__dirname);
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const ENTRY = '유락 메인.dc.html';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
};

const NO_CACHE = new Set(['.html', '.js', '.css', '.json']);

function send404(res, urlPath) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found: ' + urlPath);
}

function resolveFile(urlPath) {
  let rel = decodeURIComponent(urlPath.split('?')[0]);
  if (rel === '/' || rel === '/index.html') rel = '/' + ENTRY;
  rel = rel.replace(/^\/+/, '').replace(/\//g, path.sep);

  const filePath = path.resolve(ROOT, rel);
  const rootWithSep = ROOT.endsWith(path.sep) ? ROOT : ROOT + path.sep;
  if (filePath !== ROOT && !filePath.startsWith(rootWithSep)) return null;
  return filePath;
}

const server = http.createServer((req, res) => {
  const urlPath = req.url || '/';
  const filePath = resolveFile(urlPath);
  if (!filePath) return send404(res, urlPath);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) return send404(res, urlPath);

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const range = req.headers.range;
    const extra = NO_CACHE.has(ext) ? { 'Cache-Control': 'no-store' } : {};

    if (range) {
      const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : stat.size - 1;
      if (Number.isNaN(start) || start < 0 || end >= stat.size || start > end) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
        return res.end();
      }
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': type,
        ...extra,
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': type,
        'Accept-Ranges': 'bytes',
        ...extra,
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

function openBrowser(url) {
  if (process.env.NO_BROWSER) return;
  if (process.platform === 'win32') {
    exec(`start "" "${url}"`);
  } else if (process.platform === 'darwin') {
    exec(`open "${url}"`);
  } else {
    exec(`xdg-open "${url}"`);
  }
}

function start(port, triesLeft) {
  const onError = (err) => {
    server.removeListener('listening', onListen);
    if (err.code === 'EADDRINUSE' && triesLeft > 1) {
      console.log(`  Port ${port} is already in use. Trying ${port + 1}...`);
      start(port + 1, triesLeft - 1);
      return;
    }
    if (err.code === 'EADDRINUSE') {
      console.error(`\n  Could not find a free port (started at ${PORT}).`);
      console.error('  Stop the other process, or run:  set PORT=3000&& npm run dev\n');
      process.exit(1);
    }
    console.error(err);
    process.exit(1);
  };

  const onListen = () => {
    server.removeListener('error', onError);
    const url = `http://localhost:${port}/`;
    console.log(`\n  UROCK homepage dev server`);
    console.log(`  ➜  ${url}  (${ENTRY})\n`);
    openBrowser(url);
  };

  server.once('error', onError);
  server.once('listening', onListen);
  server.listen(port);
}

start(PORT, 10);
