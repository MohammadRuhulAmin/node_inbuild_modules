import http from "node:http"


const server = http.createServer((req,res)=>{
    req.end()
})
server.maxHeadersCount = 100;
server.requestTimeout = 10*1000;
server.timeout = 10 * 1000;
server.maxRequestsPerSocket = 5;
server.on('close',()=>{console.log('server is closed')})

server.on('clientError',(err,socket)=>{
    socket.end('Bad request')
    
}).listen(8000,()=>{
    console.log(server.listening)
})

server.on('connect',(req,socket,head)=>{
    socket.write('HTTP/1.1 200 Connection Established\r\n\r\n')
    socket.end()
})

server.on('connection',(socket)=>{
    console.log('New Connection from :',socket.remoteAddress)
})
server.closeAllConnections(()=>{
    console.log("all connection closed")
})

http.Server.prototype[Symbol.asyncDispose] = async function () {
    this.Server.close()
}

server.close(()=>{console.log(server.listening)})
