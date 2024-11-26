import net from 'node:net';

// Connect to the server on port 8080
const client = net.createConnection({ host: 'localhost', port: 8080 }, () => {
    console.log('Connected to the chat server');
    console.log('Type a message and press Enter to send');
});

// Listen for messages from the server (other clients)
client.on('data', (data) => {
    console.log(data.toString());
});

// Handle server disconnection
client.on('end', () => {
    console.log('Disconnected from the chat server');
});

// Send a message to the group chat
process.stdin.on('data', (message) => {
    client.write(message.toString().trim());
});
