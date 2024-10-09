import http from 'http';
import { AsyncLocalStorage } from 'async_hooks';

class Server {
    constructor(port) {
        this.port = port;
        this.asyncLocalStorage = new AsyncLocalStorage();
        this.reqId = 0;
        this.server = http.createServer(this.requestHandler.bind(this));
    }

    process() {
        const store = this.asyncLocalStorage.getStore();
        console.log(`The process request: ${JSON.stringify(store)}`);
    }

    requestHandler(req, res) {
        if (req.url === '/go') {
            // Use run to create a new context with reqId
            this.asyncLocalStorage.run({ requestId: this.reqId++ }, () => {
                this.asyncLocalStorage.bind(this.process) // without invoking the the function directly 
                // i am just bind process function 
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Request processed\n'); // End the response
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}

const port = 8080;
const serverInstance = new Server(port);
serverInstance.start();
