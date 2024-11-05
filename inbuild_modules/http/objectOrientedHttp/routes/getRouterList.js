// File: app.js
import MyHttpServer from "../HttpServers/myHttpServer.js";
import http from "node:http";

const PORT = 3000;
const options = {
    hostname: "localhost",
    port: PORT,
    path: "/fetch-api",
    method: "GET"
};

const myServer = new MyHttpServer(PORT, {}, '../../../fileSystem/tmp/big.txt');

// Route to fetch data from the server
myServer.addRoute("GET", "/fetch-api", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: "Response sent!" }));
    res.end();
});

// Route to fetch static data
myServer.addRoute("GET", "/fetch-data", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Fetch API CALLED! 2" }));
});

// Route for socket data with HTTP request
myServer.addRoute("GET", "/socket-data", (req, res) => {
    http.get(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            console.log(data);
            res.end(data);
        });
    }).on('socket', (socket) => {
        console.log('Socket connection created for request');
        socket.emit('agentRemove');
    }).on('error', (err) => {
        console.error(err.message);
    });
});

// Proxy route using fetchApi method
myServer.addRoute("GET", "/proxy-fetch", (req, res) => {
    myServer.fetchApi(options, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        }
    });
});

// Route for reading file stream
myServer.addRoute("GET", "/read-stream", (req, res) => {
    myServer.fileReadStream(res);
});

// Start the server
myServer.start();
