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
            const req = request(options,(res)=>{
                let data = ''
                res.on('data',(chunk)=>{data += chunk})
                res.on('error',(err)=>{reject(err.message)}) 
                res.on('end',()=>{resolve(data)})
            })
            req.on('socket',(socket)=>{socket.emit('agentRemove')})
            req.on('connect',()=>{resolve('socket connected....')})
            req.on('error',(err)=>{reject(err.message)})
            req.on('close',()=>{resolve('Socket closed')})
            req.on('finish',()=>{console.log("request finish")})
            req.on('information',(info)=>{console.log(info)})
            req.on('upgrade',()=>{console.log('upgrade')})
            req.on('timeout',()=>{console.error('Request Timed out');
                req.destroy(new Error('Request Timeout'))})
            req.end()
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