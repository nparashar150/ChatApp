const { app, BrowserWindow } = require('electron')
const isDev = require("electron-is-dev");
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, "./icon/icons/win/icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  isDev ? win.loadURL('http://localhost:3001') : win.loadURL('https://lustrous-bounty-332014.web.app');
  console.log(isDev);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
