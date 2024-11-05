import MyHttpServer from "../HttpServers/myHttpServer.js";
import http from "node:http";

const PORT = 3000;


const myServer = new MyHttpServer(PORT);

// Route to fetch data from the server
myServer.addRoute("GET","/fetch-api",(req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'});
    res.write(JSON.stringify({message:"Response sent!"}))
    res.end()
})

// Route to fetch static data
myServer.addRoute("GET", "/fetch-data", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Fetch API CALLED! 2" }));
});

// Start the server
myServer.start();
