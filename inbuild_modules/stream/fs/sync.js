import fs from "node:fs"
import { Buffer } from "node:buffer"
(async ()=>{
    console.time('start')
    fs.open("test.txt","w",(err,fd)=>{
        
        for(let i = 0;i<1000000;i++){
            const buff = Buffer.from(` ${i} `,"utf-8")
            fs.writeSync(fd, buff)
        }
        console.timeEnd('start')
    })

    
})()