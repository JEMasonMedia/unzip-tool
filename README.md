# Unzip Tool

This project provides a Node.js script for unzipping files from a specified directory into a target directory. This tool was created to automate the process of extracting files, particularly when dealing with large volumes of data.

A common scenario where this tool is useful is when downloading multiple files from the internet, such as from Google Drive. These files are often compressed into multiple zip archives. This script simplifies the task of unzipping each archive and organizing the files into a designated directory.

It supports three versions:

1. **`unzip_files.js`**: Uses `.env` values for directory paths.
2. **`unzip_files_cm.js`**: Uses command-line arguments for directory paths.
3. **Electron UI**: Provides a graphical user interface to interact with the script.

## Installation

1. Clone the repository or download the project files.
2. Install the required npm packages:

   ```bash
   npm install yauzl dotenv
   ```

3. If you want to use the Electron UI, navigate to the Electron directory and install additional dependencies:

   ```bash
   cd electron
   npm install
   ```

## Configuration

### `.env` File

Create a `.env` file in the root of the project directory with the following content:

```env
ZIP_DIR=C:\\PATH\\TO\\FILES
EXTRACT_DIR=S:\\PATH\\TO\\EXTRACT_DIR
```

## Usage

### 1. `unzip_files.js`

This script reads the zip directory and extract directory from the `.env` file.

**Command:**

```bash
node unzip_files.js
```

**Example Usage:**

1. Ensure the `.env` file is configured with your directories.
2. Run the script:

   ```bash
   node unzip_files.js
   ```

### 2. `unzip_files_cm.js`

This script uses command-line arguments for directory paths.

**Command:**

```bash
node unzip_files_cm.js <zipDir> <extractDir>
```

**Example Usage:**

1. Run the script with the paths as arguments:

   ```bash
   node unzip_files_cm.js C:\\PATH\\TO\\FILES S:\\PATH\\TO\\EXTRACT_DIR
   ```

### 3. Electron UI

The Electron UI provides a graphical interface to run the unzip script and view the output.

**Setup and Usage:**

1. Navigate to the Electron directory:

   ```bash
   cd electron-unzip-tool
   ```

2. Install Electron dependencies:

   ```bash
   npm install
   ```

3. Run the Electron app:

   ```bash
   npm start
   ```

4. Use the form in the Electron app to enter the zip directory and destination directory paths, then click "Unzip Files" to execute the script. The output and errors will be displayed in the app.
