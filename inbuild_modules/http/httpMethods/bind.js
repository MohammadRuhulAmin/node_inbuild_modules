const http = require('http');

// Sample storage for resources and their bindings
let resources = {
  'report.txt': 'This is the content of report.txt'
};

// Map to track aliases for resources
let bindings = {};

// Function to bind an alias to an existing resource
function bindAlias(alias, target) {
  if (resources[target]) {
    bindings[alias] = target;
    return `Alias '${alias}' successfully bound to '${target}'`;
  } else {
    return `Target resource '${target}' does not exist`;
  }
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Only process BIND requests
  if (method === 'BIND') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        // Parse request body JSON (e.g., { "alias": "report-link", "target": "report.txt" })
        const { alias, target } = JSON.parse(body);

        // Attempt to bind the alias to the target resource
        const message = bindAlias(alias, target);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid BIND data format');
      }
    });
  } else if (method === 'GET' && bindings[url.slice(1)]) {
    // If the URL is an alias, retrieve the target resource
    const targetResource = bindings[url.slice(1)];
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Alias '${url.slice(1)}' points to: ${resources[targetResource]}`);
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end(`HTTP method ${method} not allowed`);
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
