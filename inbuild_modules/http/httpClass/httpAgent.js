import http from "node:http"

const options = {
    hostname:'httpbin.org',
    path:'/get',
    method:'GET'
}


const server = http.createServer((req,res)=>{
    if(req.url === '/fetch-data' && req.method === 'GET'){
        http.get(options,(response)=>{
            let data = ''
            response.on('data',(chunk)=>{
                data += chunk 
            })
            response.on('end',()=>{
                res.writeHead(200,{'Content-Type':'application/json'})
                res.end(data.toString())
            })
        }).on('socket',(socket)=>{
            socket.emit('agentRemove')
        }).on('error',(err)=>{
            console.log(err.message)
            res.end('Error: ' + err.message)
        })
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'})
        res.end()
    }
})

/** LifeCycle of HTTP response */
http.get(options,(res)=>{
    let data = ''
    res.on('data',(chunk)=>{
        data+= chunk 
    })
    res.on('end',()=>{
        console.log( data.toString())
    })
}).on('socket',(socket)=>{
    socket.emit('agentRemove')
    console.log('Agent Removed')
}).on('error',(err)=>{
    console.log(err.message)
})