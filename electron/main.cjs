const { app, BrowserWindow, shell, protocol } = require("electron");
const path = require("path");

// Roten til det statiske SvelteKit-bygget
const DIST = path.join(__dirname, "..", "build");

// SvelteKit emitter absolutte stier ("/_app/..."). Vi fanger file://-protocolen
function mapFileUrl(requestUrl) {
  let p = decodeURIComponent(requestUrl.substring("file://".length));
  // file:///C:/... på Windows; her er vi primært mac/linux
  if (/^\/[A-Za-z]:\//.test(p)) p = p.substring(1);
  if (p === "" || p === "/") p = "/index.html";
  return path.join(DIST, p);
}

function createWindow() {
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
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });

  win.loadURL("file:///index.html");
}

app.whenReady().then(() => {
  protocol.interceptFileProtocol("file", (request, callback) => {
    callback(mapFileUrl(request.url));
  });
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
