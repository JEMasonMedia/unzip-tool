const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { exec } = require('child_process')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  ipcMain.handle('run-script', (event, zipDir, destDir) => {
    return new Promise((resolve, reject) => {
      exec(`node ../unzip_files_cm.js ${zipDir} ${destDir}`, (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`)
        }
        if (stderr) {
          reject(`stderr: ${stderr}`)
        }
        resolve(stdout)
      })
    })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
