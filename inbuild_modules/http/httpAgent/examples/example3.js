import http from "node:http"

const PORT = 3000;
const server = http.createServer((req,res)=>{
    if(req.url === '/' && req.method === 'GET'){
        const agentCred = {
            keepAlive:true,
            maxSockets:10,
            maxTotalSockets:Infinity,
            schedule:'lifo',
            timeout:5000,
            keepAliveMscs: 2000
        }

        const options = {
            hostname:'example.com',
            port:80,
            path:'/',
            method:'GET',
            agent : new http.Agent(agentCred)
        }

        const myReq = http.request(options,(myRes)=>{
            let data = ''
            myRes.on('data',(chunk)=>{
                data += chunk 
            })
            myRes.on('end',()=>{
                console.log(data)
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(data)
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
        })

        myReq.on('timeout',()=>{
            console.log('connection has been timed out')
        })
        myReq.on('error',(err)=>{
            console.log(err.message)
        })

        myReq.end()
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'})
        res.write('404 Not Found!')
        res.end()
    }
})




server.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})




