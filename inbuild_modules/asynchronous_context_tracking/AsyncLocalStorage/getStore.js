import http from 'http';
import {AsyncLocalStorage} from 'async_hooks';

class Server{
    constructor(port){
        this.port = port;
        this.asyncLocalStorage = new AsyncLocalStorage();
        this.reqId = 0;
        this.server = http.createServer(this.requestHandler.bind(this));
    }
    process (){
        const store = this.asyncLocalStorage.getStore();
        console.log(`The porcess request ${store}`)
    }
    requestHandler(req, res) {
        if (req.url === '/go') {
            this.asyncLocalStorage.run(this.reqId++, async () => {
                this.process();  // Log the process
                res.end();       // End the response
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