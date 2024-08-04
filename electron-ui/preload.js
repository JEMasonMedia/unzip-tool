const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  runScript: (zipDir, destDir) => ipcRenderer.invoke('run-script', zipDir, destDir),
})
