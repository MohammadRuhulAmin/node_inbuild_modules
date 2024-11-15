import {request} from "node:http"
'use strict'
class httpAgentManager{
    constructor(options){
        this.options = options 
    }
    agentPerformer(){
        return new Promise((resolve,reject)=>{
            request(this.options,(res)=>{
                let data = ''
                res.on('data',(chunk)=>{data += chunk})
                res.on('error',(err)=>{reject(err)}) 
                res.on('end',()=>{resolve(data)})
            }).on('socket',(socket)=>{
                socket.emit('agentRemove')
            }).on('error',(err)=>{reject(err)})
            .on('error',(err)=>{
                reject(err.message)
            })
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