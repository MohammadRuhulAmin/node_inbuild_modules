import HttpAgentManager from './Agent.js';
import http from "node:http"
const agentInfo = {
  keepAlive: true,
  timeout: 6000,
  maxSockets: 10,
  maxTotalSockets: Infinity,
};

const options = {
  host: 'example.com',
  path: '/',
  port: 80,
  method: 'GET',
  agent: new http.Agent(agentInfo), // Optional agent configuration
};

try{
    const httpAgentManager = new HttpAgentManager(options);
    const responseData = await httpAgentManager.agentPerform();
    console.log('Response Data:', responseData);
}catch(err){
    console.log(err.message)
}finally{
    console.log('Process finish')
    process.exit(0)
}

