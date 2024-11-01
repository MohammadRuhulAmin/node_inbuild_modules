import net from 'node:net'



const clients = new Map()
let socketId = 0
const port = 3000
const server = net.createServer((socket)=>{
    socketId++
    clients.set(socketId,socket)
    send_msg(socketId)
    socket.on('data',(data)=>{
        console.log(data.toString())
    })

})

function send_msg(socketId){
    const clientSocket = clients.get(socketId)
    if(clientSocket){
        clientSocket.write("Hi, Welcome to my Server")
    }
}


server.listen(port,'127.0.0.1',()=>{
    console.log(`Server is listening at ${port}`)
})