import net from "node:net"
const server = net.createServer((socket) => {
    socket.end('goodbye\n');
  }).on('error', (err) => {
    // Handle errors here.
    throw err;
  });

  
  // Grab an arbitrary unused port.
  server.listen(() => {
    console.log('opened server on', server.address());
  });

  /**
   * The server.ref() method is useful for preventing
   *  the server from closing automatically when there are no listeners or active connections.
   */