import http from "node:http";
import * as fs from "node:fs";

const server = http.createServer((req, res) => {
  // Attempt to create a read stream for the file
  const readStream = fs.createReadStream('../fileSystem/tmp/big.txt');

  // Handle read stream errors
  readStream.on('error', (err) => {
    console.error('File read error:', err);
    // Respond with 500 error and message only if headers have not been sent
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  });

  // Set response headers and pipe the stream only if no errors occur
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  readStream.pipe(res);
});

server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
