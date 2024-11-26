import net from "node:net"
let socketId = 0
const socketServer = net.createServer()
socketServer.maxConnections = 6;
socketServer.on('connection',(socket)=>{
    console.log('new Client connected')
    socket.write('Hi Client!')
    socket.on('data',(data)=>{console.log(data.toString())})
    socket.on('end',()=>{
        console.log('if client disconnected')
        console.log('socket is distroying')
        socket.destroy()
    })

    socket.on('lookup',()=>{console.log('waking up!')})
    socket.on('error',(err)=>{console.error(err.message)})
    socket.on('close',()=>console.log('When the socket Connection fully closed'))
    socket.on('timeout',()=>console.log('socket timeout'))
    socketServer.getConnections((err,count)=>{
        if(err)console.error('Error getting connections count :',err)
        else console.log('Active connection Count: ',count)
    })
})

socketServer.on('listening',()=>{console.log('Server is listening...')})
socketServer.on('close',()=>console.log('server stops listening'))
socketServer.on('error',(err)=>{
    if(err.code === 'ECONNREFUSED'){console.log('connection limit reached')}
    else console.error(err.message) 
})
socketServer.on('end',()=>console.log('when server finishes all the connections'))
socketServer.listen(8080,'127.0.0.1',()=>{
    console.log(socketServer.address())

})

socketServer.ref()


