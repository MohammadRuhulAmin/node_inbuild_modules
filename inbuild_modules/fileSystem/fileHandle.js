import * as fs from 'node:fs/promises'

class manageFile{
    constructor(filepath){
        this.filepath = filepath
    }
    async appendMode(){
        /** open the file in append mode */
        const fileHandle = await fs.open(this.filepath,'a')
        try{
            await fileHandle.appendFile('Hi this is ruhul\n')
            console.log(`Data appended Successfully!`)
            await fileHandle.chmod(384) 
            console.log('File permissions updated: Owner can read and write.')
        }catch(error){
            console.log(error.message)
        }finally{
            /**
             * 
             * In the case of await fileHandle?.close();:

    If fileHandle is a valid object (for example, if a file was successfully opened), the close() method will be called, and the program will wait for that operation to complete.
    If fileHandle is null or undefined, the expression will evaluate to undefined, and the close() method will not be called. 
    This prevents the error that would occur if you attempted to call a method on an undefined variable.
             * 
             */
            await fileHandle?.close()
            console.log(`File handle closed!`)
        }
    }

    async readMode(){
        let fileHandle;
        try{
            fileHandle = await fs.open(this.filepath,'r')
            const stats = await fileHandle.stat()
            const buffer = new Uint8Array(stats.size)
            await fileHandle.read({buffer,length:stats.size,position:0})
            const fileContents = new TextDecoder('utf-8').decode(buffer)
            console.log(fileContents)
            console.log(stats)
        }catch(error){
            throw new Error('Unable to Read using ReadMode Method')
        }finally{
            await fileHandle?.close()
        }
    }

}

/*
const object = undefined
console.log(object?.about)
*/


try{
    const m1 = new manageFile('./tmp/file01')
    m1.appendMode()
    m1.readMode()
}catch(err){
    console.log(err.message)
}finally{
    console.log('Program Closed!')
}

