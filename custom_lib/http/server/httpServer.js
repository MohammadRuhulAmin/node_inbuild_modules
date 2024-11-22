import http from "node:http"

class httpServer{
    constructor(serverConfig){
        this.port = serverConfig.port 
        this.routes = {
            GET:{},
            POST:{},
            PUT:{},
            DELETE:{}
        }
        this.server = http.createServer((req,res)=>{
            const method = req.method 
            const url = req.url 
            if(this.routes[method] && this.routes[method][url]){
                this.routes[method][url](req,res)
            }else{
                res.statusCode = 404
                res.write('Not Found')
                res.end()
            }
        })
    }

    get(url,handler){this.routes.GET[url] = handler}
    post(url,handler){this.routes.POST[url] = handler}
    put(url,handler){this.routes.PUT[url] = handler}
    delete(url,handler){this.routes.DELETE[url] = handler}

    startServer(){
        this.server.listen(this.port,()=>{console.log(`server is running at http://localhost:${this.port}`)})
    }
    stopServer(){
        this.server.close(()=>{console.log(`Server has been stopped`)})
    }
    
}

export default httpServer