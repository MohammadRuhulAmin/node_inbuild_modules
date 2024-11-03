import {open} from 'node:fs/promises'

class FileHandle{
    constructor(filePath,data){
        this.filePath = filePath
        this.data = data
    }

    async writeFileAndSync(){
        let fileHandle;
        try{
            fileHandle = await open(this.filePath,'w')
            await fileHandle.writeFile(this.data)
            console.log('Data written to file')
            await fileHandle.datasync()
            console.log('File synchronized successfully.');
        }catch(err){
            console.log(err.message)
        }
    }
}

const f1 = new FileHandle('../tmp/example.txt', 'Hello, world!')
f1.writeFileAndSync()

/**
 * The fileHandle.datasync() method in Node.js is used to synchronize a file's in-memory state with the underlying storage device. 
 * This ensures that any data written to the file is physically saved to disk. Here's a more detailed look at its functionality and usage:
What fileHandle.datasync() Does

    Data Synchronization: When you perform write operations on a file using a file handle,
     the data may not immediately be written to the physical storage. The datasync() method forces the system to flush any changes made to the file to the disk, ensuring data integrity in case of a power failure or crash.

    Performance Considerations: Using datasync() can impact performance because 
    it makes sure that all buffered data is written to disk. This is important in scenarios where data loss is unacceptable, such as in databases or transaction logs.

    Returns a Promise: The datasync() method returns a Promise that resolves when the synchronization is complete. If an error occurs during the synchronization, the Promise will be rejected.
 * 
 */

/**
 * When to Use datasync()

    Critical Data: Use datasync() when working with critical data that must be reliably saved to disk, such as logs or databases.
    Performance Impact: Be mindful that frequent use of datasync() can lead to performance degradation, so it should be used judiciously.
    Alternatives: If you're writing large amounts of data and performance is a concern, consider strategies like buffering writes or using a caching mechanism that allows you to control when data is flushed to disk.

In summary, fileHandle.datasync() is a useful method for ensuring that file data is safely written to storage, providing a safeguard against data loss in critical applications.
 */