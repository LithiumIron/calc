const { app, BrowserWindow, ipcMain} = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 308,
    height: 500,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  win.loadFile("index.html");
}


app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("minimize-app", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
})
