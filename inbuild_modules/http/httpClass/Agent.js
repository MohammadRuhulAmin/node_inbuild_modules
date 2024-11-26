import { Agent, request } from 'http';

// Create a new Agent with custom settings
const agent = new Agent({
  keepAlive: true,              // Keep sockets open after a request
  keepAliveMsecs: 1000,          // Time to keep sockets open (in ms)
  maxSockets: 5,                 // Maximum sockets per host
  maxTotalSockets: 10,           // Maximum sockets across all hosts
  schedule:'lifo',
  timeout:5000
});

// Check agent properties
console.log("Agent properties:");
console.log("keepAlive:", agent.keepAlive);
console.log("keepAliveMsecs:", agent.keepAliveMsecs);
console.log("maxSockets:", agent.maxSockets);
console.log("maxTotalSockets:", agent.maxTotalSockets);

// Make a request using the agent
const options = {
  hostname: 'example.com',
  port: 80,
  path: '/',
  method: 'GET',
  agent :agent // use our custom agent
};

// Tracking active and pending requests
agent.requests = agent.requests || {};
agent.sockets = agent.sockets || {};

console.log("\nMaking HTTP request...");

const req = request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log("\nResponse received:");
    console.log(data);

    // Log agent's active and pending requests
    console.log("\nActive Requests:", agent.requests);
    console.log("Active Sockets:", agent.sockets);

    // Destroy the agent after the request
    agent.destroy();
    console.log("\nAgent destroyed");
  });
});


req.on('error', (error) => {
  console.error(error);
});

req.end();

// Reusing a socket example (useful for custom socket management)
agent.reuseSocket = function(socket, req) {
  console.log("\nReusing socket:", socket.remoteAddress, "for", req.path);
};

// Monitor the socket creation
agent.on('free', (socket, options) => {
  console.log("\nSocket freed for reuse:", socket.remoteAddress);
});
