import {open} from 'node:fs/promises'

class FileHandler{
    constructor(filePath){
        this.filePath = filePath
    }
    async printFile(){
        try{
            const fd = await open(this.filePath)
            const stream = fd.createReadStream({start:0,end:10})
            for await(const chunk of stream){
                console.log(chunk.toString())
            }
        }catch(err){
            console.log(err.message)
        }
    }
}

const s1 = new FileHandler('../tmp/big.txt')
s1.printFile()

