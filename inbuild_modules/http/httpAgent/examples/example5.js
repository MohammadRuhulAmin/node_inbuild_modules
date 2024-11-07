import http from "node:http"
import {connect} from "node:net"
import {URL} from "node:url"

http.createServer((req,res)=>{
	res.writeHead(200,{"Content-Type":"text/plain"})
	res.write("Data Sent")
	res.end()
}).on('connect',(req,clientSocket,head)=>{
	const {port,hostname} = new URL(`http://$req.url`)
	const serverSocket = connect(port || 80, hostname,()=>{
		clientSocket.write('HTTP connected!')
		serverSocket.write(head).pipe(clientSocket).pipe(serverSocket)
		
		
	})
	
	
}).listen(1337,'127.0.0.1',()=>{
	const options = {
		host:'127.0.0.1',
		port:1337,
		method:'CONNECT',
		path:'www.google.com:80'
	}
	const req = request(options).end() // sent the request 
	req.on('connect',(res,socket,head)=>{
		socket.write('GET / http/1.1')
		socket.on('data',(chunk)=>{
				console.log(chunk.toString())
		})
		socket.on('end',()=>{
			req.close()
		})
	})
	
})

