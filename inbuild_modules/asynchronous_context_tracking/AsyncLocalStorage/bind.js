
import http from "node:http"
import {AsyncLocalStorage} from "async_hooks"
import { uuidv4 }  from "node:uuid"

const asyncLocalStorage = new AsyncLocalStorage();
function logRequestId() {
    const context = asyncLocalStorage.getStore();
    if (context) {
        console.log(`Logged requestId: ${context.requestId}`);
    } else {
        console.log('No context found');
    }
}

const server = http.createServer((req, res) => {
    const requestId = uuidv4();
    asyncLocalStorage.run({ requestId }, () => {
        console.log(`Handling request with requestId: ${requestId}`);

        const boundLogRequestId = asyncLocalStorage.bind(logRequestId);
        setTimeout(() => {
            console.log('Inside setTimeout, will log requestId now:');
            boundLogRequestId(); 
        }, 1000);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
