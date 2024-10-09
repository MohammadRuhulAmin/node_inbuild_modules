import http from "node:http"
import  {AsyncLocalStorage} from "async_hooks"

const asyncLocalStorage = new AsyncLocalStorage()
let requestId = 0
let requestIdAbout = 0
const performTask = async()=>{
    console.log('performing task id root url: ', requestId)
    console.log('performing task id About url:', requestIdAbout)
}

const server = http.createServer(function(req,res){
    res.setHeader('content-Type','text/plain')
    if(req.url === '/'){
        requestId++;
        asyncLocalStorage.run(requestId,async()=>{
            await performTask()
            res.statusCode = 200;
        })
        res.write("hellow World")
        res.end()
    }else if(req.url === '/about'){
        requestIdAbout++;
        asyncLocalStorage.run(requestIdAbout,async()=>{
            await performTask();
            res.statusCode = 200;
        })
        res.write("this is about page!")
        res.end()
    }else{
        res.statusCode = 404;
        res.write("404 Not Found!")
        res.end()
    }
});

const PORT = 8080;
server.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}/`)
})