import http from 'node:http';
'use strict';

class HttpApp{
    constructor(){
        this.routes = {
            GET:{},
            POST:{},
            PUT:{},
            DELETE:{}
        };
    }
    
    /** Method to handle route registration */
    addRoute(method,path,handler){
        this.routes[method][path] = handler;
    }

    /**Define methods for each HTTP verb */
    get(path,handler){this.addRoute('GET',path,handler)}
    post(path,handler){this.addRoute('POST',path,handler)}
    put(path,handler){this.addRoute('PUT',path,handler)}
    delete(path,handler){this.addRoute('DELETE',path,handler)}
    listen(port,callback){
        const server = http.createServer((req,res)=>{
            const {method,url} = req;
            const routeHandler = this.routes[method][url]
            if(routeHandler){
                routeHandler(req,res)
            }else{
                res.statusCode = 404
                res.end('404 Not Found')
            }
        });
        server.listen(port,callback)
    }
}
export default HttpApp;