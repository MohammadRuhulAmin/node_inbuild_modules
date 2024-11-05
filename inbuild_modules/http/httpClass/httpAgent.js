import http from "node:http"
const PORT = 3000
const options = {
    hostname:'httpbin.org',
    path:'/get',
    method:'GET'
}
const server = http.createServer((req,res)=>{
    if(req.url === "/fetch-api" && req.method === "GET"){
        http.get(options,(response)=>{
            let data = ''
            response.on('data',(chunk)=>{
                data += chunk 
            })
            response.on('end',()=>{
                console.log(data.toString())
                res.writeHead(200,{'Content-Type':'application/json'})
                res.end(data)
            })
        }).on('socket',(socket)=>{
            socket.emit('agentRemove')
        }).on('error',(err)=>{
            console.log(err.message)
        })
    }else{
        res.writeHead(404,{'Content-Type':'application/json'})
        res.write("404 Not Found")
        res.end()
    }
})

server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})