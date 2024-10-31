import http from "node:http"
import {Worker} from "node:worker_threads"
import {createWorker,THREAD_COUNT} from "./thread/thread_config.js"

const port = 8000;

const server = http.createServer(async (req,res)=>{
    if (req.url === "/"){
        res.write("Home Page!")
        // res.end()
    }
    else if(req.url === "/non-blocking"){
        res.write("Non Blocking Page!")
        // res.end()
    }
    else if(req.url === "/blocking"){
        try{
            const workerPromises = []
            console.log(THREAD_COUNT)
            for (let i = 0;i<THREAD_COUNT;i++){
                workerPromises.push(createWorker())
            }
            const threadResults = await Promise.all(workerPromises)
            const total = threadResults[0]+threadResults[1]+threadResults[2]+threadResults[3]
            res.write(`The blocking result: , ${total}`)
            // res.end()
        }catch(error){
            res.write(`Error occured ${error}`)
            // res.end()
        }
        res.end()
    }
    else{
        res.write("No Such route!")
        res.end()
    }
});

server.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})