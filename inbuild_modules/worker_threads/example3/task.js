import {parentPort,isMainThread} from "node:worker_threads"

if (!isMainThread){
    const work = 5
    if(work ==1){
        process.exit(1)
    }
    if(work == 2){
        throw new Error('Error...!')
    }
    else{
        parentPort.postMessage("Message Send!")
        parentPort.on('message',(data)=>{
            console.log('From parent Thread: ',data) 
        })
        process.exit(1)
    }
}



console.log("Worker Thread worked!")
