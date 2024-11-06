import http from "node:http";

// Define agent credentials
const agentCred = {
    keepAlive: true,
    keepAliveMsecs: 2000,
    maxSockets: 10,
    maxTotalSockets: Infinity,
    scheduling: 'lifo',
    timeout: 5000
};

// Options for the external HTTP request to example.com
const options = {
    hostname: 'example.com',
    port: 80,
    method: 'GET',
    path: '/',
    agent: new http.Agent(agentCred)
};

// Create the server
const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === 'GET') {
        // Make a request to example.com when root URL is hit
        const externalReq = http.request(options, (externalRes) => {
            let resData = '';

            // Collect data from the response
            externalRes.on('data', (chunk) => {
                resData += chunk;
            });

            // Send the data to the client once complete
            externalRes.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(resData);
            });
        });

        // Handle errors on the request to example.com
        externalReq.on('error', (err) => {
            console.log(`Request error: ${err.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error connecting to example.com');
        });
        externalReq.end();
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
