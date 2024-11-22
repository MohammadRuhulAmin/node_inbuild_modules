import {request} from "node:http"
'use strict'
class httpAgentManager{
    constructor(options){
        this.options = options 
        this.headers = options.headers || {}
    }
    setHeader(name,value){this.headers[name]=value}
    getHeaders(name){return this.headers[name]}
    removeHeader(name){delete this.headers[name]}
    agentPerformer(){
        return new Promise((resolve,reject)=>{
            const options = {...this.options,headers:this.headers}
            console.log(options)
            request(options,(res)=>{
                let data = ''
                res.on('data',(chunk)=>{data += chunk})
                res.on('error',(err)=>{reject(err)}) 
                res.on('end',()=>{resolve(data)})
            }).on('socket',(socket)=>{
                socket.on('connect',()=>{resolve('socket connected!')})
                socket.emit('agentRemove')
            }).on('error',(err)=>{reject(err)})
            .on('error',(err)=>{
                reject(err.message)
            }).on('close',()=>{resolve('Socket closed')})
            .end()
        })
    }
    
}

export default httpAgentManager;


/**
 * use cases:
 * 1. API consumption
 * 2. Internal Microservice Communication
 * 3. Middleware for Proxies
 * 4. Custom Workflows
 * 5. Error Handling and Debbuging
 * 6. Flexible HTTP Configuration
 * 
 */

/**additional methods */

/** req.setHeader(name,value) */
/** req.getHeader(name) */
/** removeHeader() */
/** res.resume() */
/** res.read() */