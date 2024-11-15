import { createServer } from 'http';

// Sample ACLs for resources
let aclData = {
  'report.txt': {
    'Alice': ['read', 'write'],
    'Bob': ['read'],
    'Managers': ['read', 'write'],
    'Guests': []
  }
};

// Helper function to update ACLs for a resource
function setAcl(resource, user, permissions) {
  aclData[resource] = aclData[resource] || {};
  aclData[resource][user] = permissions;
  return aclData[resource];
}

// Create HTTP server
const server = createServer((req, res) => {
  const { method, url } = req;

  // Parse URL to get resource name, e.g., "/report.txt"
  const resource = url.slice(1); // Removes leading "/"

  if (method === 'ACL') {
    // Check if resource exists in the aclData
    if (!aclData[resource]) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`Resource ${resource} not found`);
      return;
    }

    // Example request body to set ACL: {"user": "Alice", "permissions": ["read", "write"]}
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const { user, permissions } = JSON.parse(body);

        // Update the ACL for the specified resource and user
        const updatedAcl = setAcl(resource, user, permissions);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `ACL updated for ${resource}`, acl: updatedAcl }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid ACL data format');
      }
    });
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
