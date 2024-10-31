import cluster from "node:cluster"
import http from "node:http"
import { availableParallelism } from "node:os"
import process from "node:process"

const numCPUS = availableParallelism()

if(cluster.isPrimary){
    console.log(`primary ${process.pid} is running`)
    for(let i = 0;i<numCPUS;i++){
        cluster.fork()
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid}`)
    })
}else{
    http.createServer((req,res)=>{
        res.writeHead(200);
        res.end(`HellowWorld\n`)
    }).listen(8000);
    
  console.log(`Worker ${process.pid} started`);
}

/**
 * How worker works?
 * IPC: Inter-Process Communication
 * 
 */