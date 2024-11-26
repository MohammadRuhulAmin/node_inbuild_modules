import http from "node:http"

const server = http.createServer((req,res)=>{
    res.on('close',()=>{console.log('connection has been closed')})
    res.on('finish',()=>{console.log('response has been fully sent.')})
    res.cork()
    res.write('Hellow!')
    res.write('this is a test response with buffering')
    res.uncork()
    res.flushHeaders() /** forces the response headers to be sent immediately to the client even vefore any data is written */
    if(res.finished){console.log('Response has been finished successfully!')}

    req.end()
})
server.maxHeadersCount = 100;
server.requestTimeout = 10*1000;
server.timeout = 10 * 1000;
server.maxRequestsPerSocket = 5;
server.maxHeadersCount = Infinity;
server.keepAliveTimeout = 5000
server.on('close',()=>{console.log('server is closed')})

server.on('clientError',(err,socket)=>{
    socket.end('Bad request')

}).listen(8000,()=>{
    console.log(server.listening)
})

server.on('checkContinue',(req,res)=>{
  console.log('Received 100-continue request.')
  res.writeContinue()
  res.end('Continue Request Handled')
})

server.on('request',(req,res)=>{
   console.log(`${req.method} ${req.url}`)
})

server.on('dropRequest',(req,socket)=>{
  socket.end()
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

server.closeIdleConnections();

server.close(()=>{console.log(server.listening)})
