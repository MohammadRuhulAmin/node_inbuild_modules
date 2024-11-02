import {SocketAddress} from "node:net"

const serverAddress = new SocketAddress({
    address: '127.0.0.1',
    port: 8000
})
console.log(serverAddress)