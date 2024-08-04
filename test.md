# Unzip Tool

This project provides a Node.js script for unzipping files from a specified directory into a target directory. It supports two versions:

1. **`unzip_files.js`**: Uses `.env` values for directory paths.
2. **`unzip_files_cm.js`**: Uses command-line arguments for directory paths.

## Installation

1. Clone the repository or download the project files.
2. Install the required npm packages:

   ```bash
   npm install yauzl dotenv
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
