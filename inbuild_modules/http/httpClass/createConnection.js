import net from "node:net"

// Connect to a server running on localhost, port 8080
const client = net.createConnection({ port: 80, host: 'example.com' }, () => {
  console.log('Connected to server!');
  client.write('Hello, server!'); // Send a message to the server
});

// Event listener for receiving data from the server
client.on('data', (data) => {
  console.log('Received:', data.toString());
  client.end(); // Close the connection after receiving data
});

// Event listener for connection ending
client.on('end', () => {
  console.log('Disconnected from server');
});

// Event listener for errors
client.on('error', (err) => {
  console.error('Connection error:', err);
});
