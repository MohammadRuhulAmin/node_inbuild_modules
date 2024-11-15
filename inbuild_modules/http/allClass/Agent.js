
import {request} from "node:http"

class HttpAgentManager{
    constructor(options){
        this.options = options 
    }
    agentPerform(){
        return new Promise((resolve,reject)=>{
            const req = request(this.options,(res)=>{
                let data = ''
                res.on('data',(chunk)=>{
                    data+=chunk
                })
                res.on('error',(err)=>{
                    reject(new Error(`${err.message}`))
                })
                res.on('end',()=>{
                    resolve(data)
                    req.destroy() /** ensure the distroy after req completion */
                })
            }).on('socket',(socket)=>{
                socket.emit('agentRemove')
            }).on('error',(err)=>{
                reject(new Error(`${err.message}`))
            })
            req.end()
        })
        
    }
}

export default HttpAgentManager
