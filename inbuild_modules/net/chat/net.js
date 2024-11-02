import net from "node:net";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
let socketId = 0;
const clients = new Map();

function processReceived() {
    var received = buffered.split('\n');
    while (received.length > 1) {
      console.log(received[0]);
      buffered = received.slice(1).join('\n');
      received = buffered.split('\n');
    }
  }
let buffered = ''
const server = net.createServer((socket) => {
    socketId++;
    clients.set(socketId, socket);
    console.log(`server connected with client ${socketId}`);
    send_msg(socketId);

    socket.on('data', (data) => {
        buffered += data;
        processReceived();
    });

    socket.on('end', () => {
        console.log(`Client ${socketId} has been disconnected!`);
    });
});

function send_msg(clientId) {
    const clientSocket = clients.get(clientId);
    clientSocket.write(`Hello client ${clientId}\n`);
}

server.listen(3000, '127.0.0.1', () => {
    console.log(`Server is listening on port 3000`);
});

let inputBuffer = '';

rl.on('line', (line) => {
    inputBuffer += line + '\n';
    const clientSocket = clients.get(socketId);
    clientSocket.write(inputBuffer);
    inputBuffer = ''; // Clear the buffer for the next input
});