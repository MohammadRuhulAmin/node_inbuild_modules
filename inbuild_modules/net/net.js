import net from 'node:net'

/** IPC stands for: Inter process communication */
let socketId = 0
const server = net.createServer((socket)=>{
    console.log('client connected!')
    
    socket.write(`Hellow Client ${socketId}, \n Connection Establised Successfully!`)
    socketId++;
    socket.on('data',(data)=>{
        
        console.log('Received', data.toString())
        
    });
    if (socketId == 3){
        socket.write()
    }
    socket.on('end',()=>{
        console.log('Client Disconnected!')
    })
    
});

server.listen(3000,'127.0.0.1',()=>{
    console.log(`Server is listening on port 3000`)
})
