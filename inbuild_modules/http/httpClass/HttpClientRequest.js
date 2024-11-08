// Import the necessary modules from Node.js
import { createServer, request } from "node:http";  // For creating HTTP server and making HTTP requests
import { connect } from "node:net";                 // For creating TCP socket connections
import { URL } from "node:url";                     // For parsing and working with URLs

// Create an HTTP proxy server
const proxy = createServer((req, res) => {
    // This function handles regular HTTP requests (not CONNECT requests)
    res.writeHead(200, { "Content-Type": "text/plain" }); // Respond with 200 status and plain text content type
    res.write('Okay');                                    // Write response message
    res.end();                                            // End the response
})

// Handle `CONNECT` requests, typically used for establishing a tunnel (e.g., for HTTPS)
.on('connect', (req, clientSocket, head) => {
    // Parse the URL from the `CONNECT` request to extract hostname and port
    // `req.url` will contain the hostname and port in the format `hostname:port`
    const { port, hostname } = new URL(`http://${req.url}`); // Default to `http` to parse the hostname:port

    // Create a TCP connection to the target server using the extracted hostname and port
    const serverSocket = connect(port || 80, hostname, () => { // Default to port 80 if no port is specified
        // Send a response back to the client to confirm the connection has been established
        clientSocket.write(
            'HTTP/1.1 200 Connection Established\r\n' +  // 200 OK response for CONNECT request
            'Proxy-agent: Node.js-Proxy\r\n' +           // Custom header to identify the proxy
            '\r\n'
        );

        // Send any remaining data (if any) that was buffered in the initial CONNECT request to the server
        serverSocket.write(head);

        // Pipe data from serverSocket (target server) to clientSocket (client)
        // This allows data from the target server to flow back to the client through the proxy
        serverSocket.pipe(clientSocket);

        // Pipe data from clientSocket (client) to serverSocket (target server)
        // This allows data from the client to flow to the target server through the proxy
        clientSocket.pipe(serverSocket);
    });
})

// Start the proxy server, listening on port 1337 on localhost
.listen(1337, '127.0.0.1', () => {
    // Configuration options for making a test `CONNECT` request to the proxy
    const options = {
        host: '127.0.0.1',          // Proxy host
        port: 1337,                 // Proxy port
        method: 'CONNECT',          // HTTP method `CONNECT` to establish a tunnel
        path: 'www.google.com:80'   // Target host and port (Google’s server on port 80)
    };

    // Create an HTTP `CONNECT` request to the proxy with the specified options
    const req = request(options);
    req.end(); // Send the request

    // Event listener for when the `CONNECT` request successfully connects to the proxy
    req.on('connect', (res, socket, head) => {
        console.log('got connected!'); // Log a message confirming the connection

        // Write a GET request to the socket to request Google’s homepage
        socket.write(
            'GET / HTTP/1.1\r\n' +                // HTTP GET request line
            'Host: www.google.com:80\r\n' +       // Host header specifying Google
            'Connection: close\r\n' +             // Close connection after the response
            '\r\n'
        );

        // When data is received from the target server (Google), log it to the console
        socket.on('data', (chunk) => {
            console.log(chunk.toString()); // Convert buffer to string and log the response
        });

        // When the server stops sending data, close the process
        socket.on('end', () => {
            process.exit(1); // Exit the Node.js process after receiving all data
        });
    });
});
