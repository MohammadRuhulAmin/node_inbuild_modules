import fs  from "node:fs/promises"

(async ()=>{
    console.time("writeMe")
    const fileHandle = await fs.open("test.txt","w")
    for(let i = 0;i<1000000;i++){
        fileHandle.write(`${i} `)
    }
    console.timeEnd("writeMe")
})()

