const fs = require('fs')
const path = require('path')
const yauzl = require('yauzl')

// example use
// node unzip_files.js "C:\\Users\\joele\\Downloads" "S:\\Transfer\\biz stuff\\MaketReal"

// Function to display all file names in a directory
async function displayFileNames(directoryPath) {
  try {
    const files = await fs.promises.readdir(directoryPath)
    files.forEach(file => {
      console.log(file)
    })
  } catch (err) {
    console.error(`Unable to scan directory: ${err}`)
    process.exit(1) // Exit the script with an error code
  }
}

// Function to ensure a directory exists, create if it doesn't
async function ensureDirectoryExists(dirPath) {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true })
  } catch (err) {
    console.error(`Error creating directory: ${err}`)
    throw err
  }
}

// Function to unzip a single file
function unzipFile(filePath, destDir) {
  return new Promise((resolve, reject) => {
    yauzl.open(filePath, { lazyEntries: true }, (err, zipfile) => {
      if (err) return reject(err)
      zipfile.readEntry()
      zipfile.on('entry', async entry => {
        const destPath = path.join(destDir, entry.fileName)
        if (/\/$/.test(entry.fileName)) {
          // Directory file names end with '/'
          try {
            await ensureDirectoryExists(destPath)
            zipfile.readEntry()
          } catch (err) {
            reject(err)
          }
        } else {
          // Ensure parent directory exists
          try {
            await ensureDirectoryExists(path.dirname(destPath))
            zipfile.openReadStream(entry, (err, readStream) => {
              if (err) return reject(err)
              readStream.pipe(fs.createWriteStream(destPath))
              readStream.on('end', () => {
                zipfile.readEntry()
              })
            })
          } catch (err) {
            reject(err)
          }
        }
      })
      zipfile.on('end', () => resolve())
      zipfile.on('error', err => reject(err))
    })
  })
}

// Function to unzip files
async function unzipFiles(sourceDir, destDir) {
  try {
    const files = await fs.promises.readdir(sourceDir)
    for (const file of files) {
      const filePath = path.join(sourceDir, file)

      // Check if the file has a .zip extension
      if (path.extname(file).toLowerCase() === '.zip') {
        console.log(`Unzipping: ${file}`)
        try {
          await unzipFile(filePath, destDir)
          console.log(`Finished unzipping: ${file}`)
        } catch (err) {
          console.error(`Error unzipping file: ${file}`, err)
        }
      } else {
        console.log(`Skipping non-zip file: ${file}`)
      }
    }
  } catch (error) {
    console.error(`Error unzipping files: ${error}`)
    process.exit(1) // Exit the script with an error code
  }
}

// Main function to encapsulate the process
async function main() {
  // Read command-line arguments
  const [, , zipDir, extractDir] = process.argv

  // Validate command-line arguments
  if (!zipDir || !extractDir) {
    console.error('Usage: node script.js <zipDir> <extractDir>')
    process.exit(1)
  }

  // Ensure paths are absolute
  const absoluteZipDir = path.resolve(zipDir)
  const absoluteExtractDir = path.resolve(extractDir)

  console.log(`Zip directory: ${absoluteZipDir}`)
  console.log(`Extract directory: ${absoluteExtractDir}`)

  await displayFileNames(absoluteZipDir)
  await unzipFiles(absoluteZipDir, absoluteExtractDir)

  process.exit(0) // Exit the script successfully
}

main()
