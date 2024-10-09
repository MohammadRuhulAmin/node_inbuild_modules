import http from "http"
import {AsyncLocalStorage} from "async_hooks"
const asyncLocalStorage = new AsyncLocalStorage();
const process = ()=>{
    console.log(`The process request: ${asyncLocalStorage.getStore()}`)
}
let reqId = 0
const server = http.createServer((req,res)=>{
    if (req.url === "/go"){
        asyncLocalStorage.run(reqId++,async()=>{
            process()
            res.end()
        })
    }
})

const port = 8080;

server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})
