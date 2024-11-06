import http from "node:http"

const server = http.createServer((req,res)=>{
    const agentCred = {
        keepAlive:true,
        schedule:'lifo',
        maxSockets:10,
        maxTotalSockets:Infinity,
        timeout: 5000,
        keepAliveMscs: 2000
    }
    const options = {
        hostname:'example.com',
        path:'/',
        method:'GET',
        port:80,
        agent: new http.Agent(agentCred)

    }
    if(req.url === '/' && req.method === 'GET'){
        const myReq = http.request(options,(myRes)=>{
            let myData = ''
            myRes.on('data',(chunk)=>{
                myData += chunk
            })
            myRes.on('end',()=>{
                console.log(myData)
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(myData)
                res.end()
            })
            myRes.on('error',(err)=>{
                console.log(err.message)
                res.end()
            })
        }).on('socket',(socket)=>{
            socket.emit('agentRemove')
        }).on('error',(err)=>{
            console.log(err.message)
            res.end()
            
        })
        myReq.end()
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'})
        res.end("Not Found")
    }
})


server.listen(3000,()=>{
    console.log(`http://localhost:3000`)
})