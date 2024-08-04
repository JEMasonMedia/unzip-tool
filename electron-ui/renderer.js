const { ipcRenderer } = require('electron')

document.getElementById('unzipButton').addEventListener('click', async () => {
  const zipDir = document.getElementById('zipDir').value
  const destDir = document.getElementById('destDir').value

  try {
    const result = await ipcRenderer.invoke('unzip-files', zipDir, destDir)
    document.getElementById('output').textContent = result
  } catch (error) {
    document.getElementById('output').textContent = `Error: ${error}`
  }
})
