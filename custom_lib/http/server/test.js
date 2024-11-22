import httpServer from "./httpServer.js";


const server = new httpServer({port:8000});


server.get('/', (req, res) => {
    res.write('Welcome to the Home Page!');
    res.end();
});

server.get('/about', (req, res) => {
    res.write('About Page');
    res.end();
});

server.post('/login', (req, res) => {
    res.write('Login POST request');
    res.end();
});

server.post('/register', (req, res) => {
    res.write('Register POST request');
    res.end();
});

server.startServer();


setTimeout(() => {
    server.stopServer();
}, 10000000);