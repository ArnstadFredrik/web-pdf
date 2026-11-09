const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const { startStaticServer } = require("./static-server.cjs");

// Roten til det statiske SvelteKit-bygget (også inni app.asar)
const DIST = path.join(__dirname, "..", "build");

let lastUrl = null;

function createWindow(url) {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    title: "PDF Hefte",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Unngå dobbel tittel i menylinjen
  win.on("page-title-updated", (e) => e.preventDefault());

  // Åpne eksterne lenker i standardnettleseren
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url) && !url.startsWith("http://127.0.0.1")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  win.loadURL(url);
  lastUrl = url;
}

app.whenReady().then(async () => {
  try {
    const srv = await startStaticServer(DIST);
    const port = srv.address().port;
    createWindow(`http://127.0.0.1:${port}/`);
  } catch (err) {
    // Fallback: prøv file:// direkte
    createWindow("file://" + path.join(DIST, "index.html"));
  }
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0 && lastUrl) {
      createWindow(lastUrl);
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
