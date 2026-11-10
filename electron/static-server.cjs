// Liten statisk filserver for det statiske SvelteKit-bygget.
// Brukes av Electron-hovedprosessen slik at appen lastes over
// http://127.0.0.1:<port> i stedet for file:// (unngår problemer med
// absolutte asset-stier og pakket asar). Ekporteres for testing.
const http = require("http");
const fs = require("fs");
const path = require("path");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
};

function createStaticServer(distDir, log) {
  return http.createServer((req, res) => {
    try {
      let urlPath;
      try {
        urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
      } catch {
        urlPath = "/";
      }
      if (urlPath === "/" || urlPath === "") urlPath = "/index.html";

      // Hindre path traversal
      const resolved = path.normalize(path.join(distDir, urlPath));
      if (!resolved.startsWith(path.normalize(distDir))) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      let filePath = resolved;
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        // SPA-fallback: ukjente stier får index.html
        filePath = path.join(distDir, "index.html");
        if (!fs.existsSync(filePath)) {
          res.writeHead(404);
          res.end("Not found (build/ mangler?)");
          return;
        }
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      fs.createReadStream(filePath)
        .on("error", () => {
          try {
            res.destroy();
          } catch {}
        })
        .pipe(res);
  } catch (err) {
      if (log) log(err);
      try {
        res.writeHead(500);
        res.end("Internal error");
      } catch {}
    }
  });
}

function startStaticServer(distDir, port = 0, log) {
  // port 0 = ledig port velges av OS; fast port gir stabil
  // opprinnelse (og dermed vedvarende localStorage) i Electron
  return new Promise((resolve, reject) => {
    const srv = createStaticServer(distDir, log);
    srv.on("error", reject);
    srv.listen(port, "127.0.0.1", () => resolve(srv));
  });
}

module.exports = { createStaticServer, startStaticServer };
