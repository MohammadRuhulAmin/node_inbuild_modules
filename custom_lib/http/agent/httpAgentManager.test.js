import assert from "node:assert";
import http from "node:http";
import httpAgentManager from "./httpAgentManager.js";

function createMockServer(responseData, statusCode = 200) {
    const server = http.createServer((req, res) => {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
    });
    return server;
}

async function responseMatching() {
    const mockData = { userId: 1, id: 1, title: "delectus aut autem", completed: false };
    const mockServer = createMockServer(mockData);
    try {
        mockServer.listen(8000);
        const options = { hostname: 'localhost', port: 8000, path: '/', method: 'GET' };
        const responseData = await new httpAgentManager(options).agentPerformer();
        assert.deepStrictEqual(JSON.parse(responseData), mockData, 'Err msg: Expected data does not match');
        console.log("Test 1: Successful Response - Passed");
    } catch (err) {
        console.error("Test 1: Successful Response - Failed:", err.message);
    } finally {
        if (mockServer) {
            mockServer.close(() => { console.log('Server is Closed'); });
        }
    }
}

responseMatching();
