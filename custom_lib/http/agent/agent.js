import httpAgentManager from "./httpAgentManager.js"
import {Agent} from "node:http"

const agentCred = {
    keepAlive:true,
    keepAliveMscs:2000,
    maxSockets:10,
    maxTotalSockets:Infinity,
    timeout:6000,
    schedule:'lifo'
}


const options = {
    host:'jsonplaceholder.typicode.com',
    port:80,
    method:'GET',
    path:'/todos/1',
    agent: new Agent(agentCred),
    headers:{
        'Expect':'100-continue',
        'username':'ruhul amin',
        'password':'12!ruhul'
    }
}

const agent = new httpAgentManager(options)

agent.on('response',(res)=>{console.log("status code:",res.statusCode)})

agent.agentPerformer()
     .then(data =>{console.log(data)})
     .catch(err=>{console.log(err.message)})
     .finally(()=>{
        process.exit(0)
     })

