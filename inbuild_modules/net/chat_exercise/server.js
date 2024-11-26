import net from 'node:net';

const clients = []; // Array to keep track of connected clients

// Create the server
const server = net.createServer((socket) => {
    console.log('New client connected');

    // Add the socket to the list of clients
    clients.push(socket);

    // Send a welcome message when the client connects
    socket.write('Welcome to the group chat!\n');

    // Handle incoming messages from the client
    socket.on('data', (data) => {
        console.log(`Message from client: ${data.toString()}`);

        // Broadcast the message to all clients
        clients.forEach((client) => {
            if (client !== socket) {
                client.write(`Client says: ${data.toString()}`); // Send the message to other clients
            }
        });
    });

    // Handle client disconnecting
    socket.on('end', () => {
        console.log('Client disconnected');
        // Remove client from the list when they disconnect
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });

    // Handle client errors
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

// Server listens on port 8080
server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
