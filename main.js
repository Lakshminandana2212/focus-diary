const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,

        }
    });
    win.loadFile('renderer/index.html');
}
const { ipcMain } = require('electron');
const fs = require('fs');

ipcMain.on('save-entry', (event, content) => {
  const today = new Date().toLocaleDateString();
  const filePath = `journal-${today}.txt`;
  fs.writeFile(filePath, content, (err) => {
    if (err) console.error(err);
  });
});


app.whenReady().then(() => {
  createWindow();
});
