const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('renderer/index.html');
}

ipcMain.handle('save-entry', async (event, newEntry) => {
  const filePath = path.join(__dirname, 'renderer', 'journal-entries.json');
  let entries = [];

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    entries = JSON.parse(data);
  } catch (e) {
    entries = [];
  }

  entries.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
});

ipcMain.handle('get-entries', () => {
  const filePath = path.join(__dirname, 'renderer', 'journal-entries.json');
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return [];
  }
});

app.whenReady().then(createWindow);
