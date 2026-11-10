const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const { startStaticServer } = require("./static-server.cjs");

// Roten til det statiske SvelteKit-bygget (også inni app.asar)
const DIST = path.join(__dirname, "..", "build");

// Fast port gjør at opprinnelsen (og dermed localStorage, som
// innstillingene lagres i) er stabil mellom kjøringer.
const PORT = 38417;

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
    if (/^https?:/i.test(url) && !url.startsWith(`http://127.0.0.1:${PORT}`)) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  win.loadURL(url);
  lastUrl = url;
}

async function start() {
  try {
    const srv = await startStaticServer(DIST, PORT);
    createWindow(`http://127.0.0.1:${srv.address().port}/`);
  } catch (err) {
    // Fallback: prøv file:// direkte (localStorage kan da være mindre stabil)
    createWindow("file://" + path.join(DIST, "index.html"));
  }
}

app.whenReady().then(async () => {
  await start();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0 && lastUrl) {
      createWindow(lastUrl);
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
