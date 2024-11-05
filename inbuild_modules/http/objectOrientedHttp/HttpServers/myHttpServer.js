import http from 'node:http'
'use strict';

class MyHttpServer{
    constructor(port){
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this))
        this.routes = []
    }
    addRoute(method,path,handler){
        this.routes.push({
            method,path,handler
        })
        console.log(this.routes)
    }
    handleRequest(req,res){
        const matchRoute = this.routes.find(route=>{
            return route.method === req.method && route.path === req.url
        })
        if(matchRoute){
            matchRoute.handler(req,res);
        }else{
            res.writeHead(404,{'Content-Type':'application/json'})
            res.end(JSON.stringify({error:"404 Not Found"}))
        }
    }
    start(){
        this.server.listen(this.port,()=>{
            console.log(`Server is running at http://localhost:${this.port}`)
        })
    }
}

export default MyHttpServer;