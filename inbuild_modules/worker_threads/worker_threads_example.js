import http from "node:http"
import worker_threads from "node:worker_threads"
import { Worker } from "node:worker_threads";
const port = 8000

const server = http.createServer((req,res)=>{
    if(req.url === '/non-blocking'){
        res.write("This page is non-blocking.")
        res.end()
    }
    else if(req.url == '/blocking'){
        const worker = new Worker("./task/task_a.js");
        worker.on("message",(data)=>{
            res.write(`This bloking site: ${data}`)
        });
        worker.on("error",(err)=>{
            res.write("Error Occured",err)
        })
    }
    else{
        res.writeHead(404,{
            'Content-Type': 'text/plain'
        });
        res.end('404 Url Not Found!')
    }
});

server.listen(port,()=>{
    console.log(`Server is Running At http://127.0.0.1:${port}`)
})
