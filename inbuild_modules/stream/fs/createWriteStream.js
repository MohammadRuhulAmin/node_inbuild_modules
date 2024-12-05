import fs from "node:fs/promises"
import * as fsSync from "node:fs"

class FileWritingPerformance{
    constructor(timeLabel,fileName,operation,filePathList =[]){
        this.timeLabel = timeLabel 
        this.fileName = fileName
        this.operation = operation
        this.filePathList = Array.isArray(filePathList)? filePathList: [filePathList]
    }
    async usingStream(){
        console.time(this.timeLabel)
        const fileHandle = await fs.open(this.fileName,this.operation)
        const stream = fileHandle.createWriteStream()
        for(const i of Array.from({length:1000000}).keys()){
            const buffer = Buffer.from(` ${i} `,"utf-8")
            stream.write(buffer)
        }
        console.timeEnd(this.timeLabel)
    }
    async usingOnlyFs(){
        console.time(this.timeLabel)
        fsSync.open(this.fileName,this.operation,(err,fd)=>{
            for(const i of Array.from({length:1000000}).keys()){
                const buffer = Buffer.from(`${i}`,'utf-8')
                fsSync.writeSync(fd,buffer)
            }
        })
        
        console.timeEnd(this.timeLabel)
    }

    async usingBuffer(){
        console.time(this.timeLabel)
        const fileHandle = await fs.open(this.fileName,this.operation)
        for(const i of Array.from({length:1000000}).keys()){
            const buffer = Buffer.from(`${i}`, "utf-8")
            fileHandle.write(buffer)
        }
        console.timeEnd(this.timeLabel)
    }

    removeFiles(){
        for(const filePath of this.filePathList){
            fsSync.unlink(filePath,(err)=>{
                if(err)console.log(err.message)
                else console.log(filePath, " deleted successfully!")
            })
       }
    }
}



const performer1 = new FileWritingPerformance("time-lebel-1","p1f1.txt",'w')
performer1.usingStream()
const performer2 = new FileWritingPerformance("time-lebel-2","p2f2.txt",'w')
performer2.usingBuffer()
const performer3 = new FileWritingPerformance("time-lebel-3","p3f3.txt",'w')
performer3.usingOnlyFs()
const deleteFiles = new FileWritingPerformance(null,null,null,["p1f1.txt","p2f2.txt","p3f3.txt"]);
deleteFiles.removeFiles()