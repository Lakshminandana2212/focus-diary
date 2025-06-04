const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveEntry: (content) => ipcRenderer.send('save-entry', content)
});
