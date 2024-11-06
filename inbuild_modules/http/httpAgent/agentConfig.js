import http from "node:http"

const agentOptions = {
    keepAlive: true, /** keep the socket connection open even after a request finishes also it will be reused for subsequent requests and it 
    helps not to create new connection each time for sending request. It reduces latency on repeadted requests to the same host */
    keepAliveMsecs : 2000, /** The initial delay for keep AliveMscs in the context of TCP keep-alive 
    packets refers to the time interval the agent will wait after a connection becomes idle */
    maxSockets: 10, /** This specify the maximum number of sockets the agent will allow per host.
    up to 10 concurrent connections (also known as socket connections) can be open to the same host at the same time. High concurrency allows mu;ltiple requests to the same host 
    to be processed simultaneously, improving response time for applications that need to fetch multiple resources in parallel
    if the maxSockets = 10 the agent will create 10 simultaneous connection to a specific host and using this 10 requests at the same time the additional 
    requests will wait in a queue until one of the active sockets closes. 
    Example: 
    suppose you have maxSocket:5,
    and you have sent 20 requests to the example.com host machine, the agent will process first 5 request and that time the next 15 requests will be
    waiting in a queue, when the request first 5 requests will be processed the next 5 request will be started for the process. 
    */
    maxTotalSockets: 5, 
    /** per host : the number of sockets (connections) that are allowed to be opened for a specific server or hostname at a time. 
     * If you are making requests to multiple hosts, the agent will open connections up to a maximum of 10 concurrent connections per host. However, once the total count of all active sockets across all hosts reaches 50, no new sockets will be opened.
     *  Any new requests beyond this limit will be queued until an existing socket becomes available. by default it is Infinity
     */
    
    maxFreeSockets: 5, /** This specifies the maximum number of free (idle) sockets the agent will keep open for each host. */
    schedule: 'lifo', /** The socket will be reused using lifo or fifo style */
    timeout: 5000 /** helps to avoid hanging requests by automatically closing connections that exceed a set duration like 5000 / 5 second, 
    improving the reliability in the application.
    if timeout:0 means that there will be no timeout for the socket, and it won't be automatically closed or expire after a specific period.
    */
}

/** create the agent with the specified options  */
const agent = new http.Agent(agentOptions)

/**  We are using the agent in the specified options*/
const options = {
    hostname:'example.com',
    port: 80,
    path:'/',
    method: 'GET',
    agent:agent 
}

const req = http.request(options,(res)=>{
    let data = ''
    console.log(`status: ${res.statusCode}`)
    res.setEncoding('utf-8')
    res.on('data',(chunk)=>{
        data+=chunk 
    })
    res.on('end',()=>{
        console.log(data)
        console.log(`No more data in response.`)
    })
    res.on('error',(e)=>{
        console.error(`problem with the request ${e.message}`)
    })
})

req.end()