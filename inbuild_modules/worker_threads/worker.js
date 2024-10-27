import {Worker, isMainThread} from "node:worker_threads"

if(isMainThread){
    console.log("Running in Main thread")
    const workerThread = new Worker('./task.js')
    workerThread.postMessage("From Parent")
    workerThread.on('message',(data)=>{
        console.log(data)
    });
    workerThread.on('error',(data)=>{
        console.log(data)
    });
    workerThread.on('exit',(data)=>{
        console.log("Exit from the tread")
    });
    

}else console.log("Not in the main Thread!")