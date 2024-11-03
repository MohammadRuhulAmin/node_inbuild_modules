import { open, promises as fsPromises } from 'node:fs';

class FileHandler {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async createReadStreamMode() {
    let fileHandle;
    try {
      fileHandle = await fsPromises.open(this.filepath, 'r'); // Open the file for reading
      console.log('File Opened Successfully');

      const stream = fileHandle.createReadStream();
      // Efficiently handle data events using async/await
      for await (const chunk of stream) {
        console.log('received Chunk:\n');
        console.log(chunk.toString());
      }

      console.log('Finished Reading File.'); // Log after all data is processed
    } catch (error) {
      console.error(error.message); // Use console.error for error messages
    } finally {
      if (fileHandle) {
        await fileHandle.close();
        console.log(`File closed successfully!`);
      }
    }
  }
}

try {
  const f1 = new FileHandler('./tmp/big.txt');
  f1.createReadStreamMode();
} catch (err) {
  console.error(err.message); // Use console.error for error messages
}