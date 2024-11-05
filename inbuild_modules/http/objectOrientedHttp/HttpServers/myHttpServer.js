import http from 'node:http'
import { hostname } from 'node:os';
'use strict';

class MyHttpServer{
    constructor(port,options = {}){
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this))
        this.routes = []
        this.options = {
            hostname:options.hostname || 'localhost',
            port: options.port || port, 
            path: options.path || '',
            method:options.method 
        }
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

    fetchData(options, callback) {
        http.get(options, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                callback(null, data);
            });
        }).on('socket', (socket) => {
            socket.emit('agentRemove');
        }).on('error', (err) => {
            callback(err);
        });
    }

    start(){
        this.server.listen(this.port,()=>{
            console.log(`Server is running at http://localhost:${this.port}`)
        })
    }
}

export default MyHttpServer;