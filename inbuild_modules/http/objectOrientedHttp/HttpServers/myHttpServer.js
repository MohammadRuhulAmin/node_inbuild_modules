import http from 'node:http';
import * as fs from 'node:fs';

class MyHttpServer {
    constructor(port, options = {}, filePath = {}) {
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this));
        this.routes = [];
        this.options = {
            hostname: options.hostname || 'localhost',
            port: options.port || port,
            path: options.path || '',
            method: options.method
        };
        this.filePath = filePath;
    }

    addRoute(method, path, handler) {
        this.routes.push({ method, path, handler });
        console.log(this.routes);
    }

    handleRequest(req, res) {
        const matchRoute = this.routes.find(route => {
            return route.method === req.method && route.path === req.url;
        });

        if (matchRoute) {
            matchRoute.handler(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "404 Not Found" }));
        }
    }

    async fileReadStream(res) {
        try {
            if (!res) {
                console.error("Response object not provided. Cannot stream file.");
                return;
            }

            // Ensure the filePath is valid
            if (!this.filePath) {
                console.error("File path not provided.");
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request: No file path provided.');
                return;
            }

            const readStream = fs.createReadStream(this.filePath, {
                encoding:'utf-8',
                highWaterMark:50
            });
            res.writeHead(200, { 'Content-Type': 'text/plain' });


            readStream.on('data',  (chunk) => {
                res.write(chunk)
            });
            
            
            readStream.on('end', () => {
                res.end(); // End the response when the stream ends
                console.log('Streaming complete');
            });

            readStream.on('error', (err) => {
                console.error('File read error:', err);
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
            });
        } catch (err) {
            console.error(err.message);
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        }
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}

export default MyHttpServer;
