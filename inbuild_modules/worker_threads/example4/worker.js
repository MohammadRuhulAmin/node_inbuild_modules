import {Worker, isMainThread, setEnvironmentData,getEnvironmentData} from "node:worker_threads"

let myData = {
        'name':'Md. Ruhul Amin',
        'email':'ruhul@gmail.com',
        'contact':'+800-1322352864'
    }

if (isMainThread){
    console.log("Inside main thread!@")
    setEnvironmentData('json', myData)
    const worker = new Worker('./task.js')
    worker.on('message',(msg)=>{
        console.log(msg)
    });
    worker.on('error',(err)=>{
        console.log(err)
    });
    worker.on('exit',(exitmsg)=>{
        console.log(exitmsg)
    });

}