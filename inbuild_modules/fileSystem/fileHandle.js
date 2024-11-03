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
            await fileHandle.close()
            console.log(`File handle closed!`)
        }
    }

}

const m1 = new manageFile('./tmp/file1')
m1.appendMode()