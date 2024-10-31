import {isMainThread, Worker} from "node:worker_threads"

if (isMainThread){
    const worker = new Worker('./task.js',{
        resourceLimits:{
            maxOldGenerationSizeMb:50,
            maxYoungGenerationSizeMb:10 ,
            codeRangeSizeMb:10 
        }
    });
    console.log("Worker Thread ID: ",worker.threadId)
    console.log(worker.resourceLimits)
}