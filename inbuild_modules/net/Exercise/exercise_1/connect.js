import net from "node:net";

// Create a socket
const socket = new net.Socket();

// Connect to example.com on port 80 (HTTP port)
socket.connect(80, 'example.com', () => {
    console.log(`Connected to example.com`);

    // Send an HTTP GET request to example.com
    socket.write('GET /api/v1/data?user=1234&filter=true HTTP/1.1\r\n');              // Request line
    socket.write('Host: example.com\r\n');            // Host header
    socket.write('Connection: close\r\n');            // Connection close header
    socket.write('\r\n');                             // End of headers
});

// Handle incoming data from the server (example.com)
socket.on('data', (data) => {
    console.log('Received data from example.com:');
    console.log(data.toString());
});

// Listen for the 'end' event when the connection is closed by the server
socket.on('end', () => {
    console.log('Connection closed by example.com');
});

// Handle errors in the socket connection
socket.on('error', (err) => {
    console.error('Error:', err.message);
});

// Handle when the socket is fully closed
socket.on('close', () => {
    console.log('Socket connection closed');
});


/**https://chatgpt.com/c/6745f475-f6a4-8008-87ec-d36c62829f8e */