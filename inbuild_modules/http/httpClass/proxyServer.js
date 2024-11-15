import { createServer, request } from 'node:http';
import { connect } from 'node:net';
import { URL } from 'node:url';

// Step 1: Create an HTTP tunneling proxy server

const proxy = createServer((req, res) => { /** req=> is an instance/object of http.IncomingMessage which is a readable stream */
  /** res=> is an instance/object of http.ServerResponse which is a writable stream  */
  // Respond to the HTTP request with a 200 OK status and plain text message
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});

// Step 2: Set up the 'connect' event for the proxy server
proxy.on('connect', (req, clientSocket, head) => {
  // Parse the URL of the destination server from the client request
  const { port, hostname } = new URL(`http://${req.url}`);
  
  // Connect to the destination server (origin server)
  const serverSocket = connect(port || 80, hostname, () => {
    // Send HTTP response to the client to confirm the tunnel connection
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +'Proxy-agent: Node.js-Proxy\r\n' +'\r\n');
    
    // Send any remaining request data (head) to the destination server
    serverSocket.write(head);

    // Pipe data between the client socket and server socket
    serverSocket.pipe(clientSocket); /** the connection from proxy server to the actual target server */
    clientSocket.pipe(serverSocket); /** the connection from the client to proxy server */
  });
});

// Step 3: Start the proxy server and listen on port 1337 at localhost
proxy.listen(1337, '127.0.0.1', () => {
  // Once the proxy server is running, create a client request to the proxy
  
  // Specify the request options to initiate a CONNECT request between proxy server and the destination server
  const options = {
    port: 1337,        // Proxy server port
    host: '127.0.0.1', // Proxy server host
    method: 'CONNECT', // HTTP CONNECT method for tunneling between proxy server and destination server
    path: 'www.google.com:80', // The destination  trying to reach via the proxy
  };

  // Send a CONNECT request to the proxy server
  const req = request(options);
  req.end(); /** no more request to send message in server */

  // Handle the 'connect' event once the proxy establishes a connection
  req.on('connect', (res, socket, head) => {
    console.log('got connected!');
    // Send an HTTP GET request through the established tunnel
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.google.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');

    // Listen for data from the destination server and log it to the console
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    // When the server has finished sending data, close the proxy
    socket.on('end', () => {
      proxy.close();
    });
  });
});
