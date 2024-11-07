import {
    createServer,
    request 
} from  "node:http";

import {connect} from "node:net"
import {URL} from "node:url"

const proxy = createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/plain"})
    res.write('Okay')
    res.end()
}).on('connect',(req,clientSocket,head)=>{
    const {port,hostname} = new URL(`http://${req.url}`)
    const serverSocket = connect(port || 80, hostname,()=>{
        clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +'Proxy-agent: Node.js-Proxy\r\n' +'\r\n')
        serverSocket.write(head)
        serverSocket.pipe(clientSocket);
        clientSocket.pipe(serverSocket)
    });
}).listen(1337,'127.0.0.1',()=>{
    const options = {
        host:'127.0.0.1',
        port:1337,
        method:'CONNECT',
        path: 'www.google.com:80'
    }
    const req = request(options);
    req.end();
    req.on('connect',(res,socket,head)=>{
        console.log('got connected!')
        socket.write('GET / HTTP/1.1\r\n' +'Host: www.google.com:80\r\n' +'Connection: close\r\n' +'\r\n')
        socket.on('data',(chunk)=>{
            console.log(chunk.toString())
        });
        socket.on('end',()=>{
           process.exit(1)
        })
    })
});


