import { Agent, get } from 'http';

// Set maxSockets to 10 for high concurrency to a single host
const agent = new Agent({
  maxSockets: 20,
  keepAlive: true
});

// Define the options for making requests
const options = {
  hostname: 'jsonplaceholder.typicode.com', // Example host
  agent: agent // Use our custom agent
};

// Function to make an HTTP GET request for a specific resource
function fetchResource(path) {
  return new Promise((resolve, reject) => {
    const req = get({ ...options, path }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    });

    req.on('error', (err) => reject(err));
    req.end();
  });
}

// Define an array of paths (resources) to fetch
const paths = [
  '/posts/1', '/posts/2', '/posts/3', '/posts/4', '/posts/5',
  '/posts/6', '/posts/7', '/posts/8', '/posts/9', '/posts/10',
  '/posts/1', '/posts/2', '/posts/3', '/posts/4', '/posts/5',
  '/posts/6', '/posts/7', '/posts/8', '/posts/9', '/posts/10'
];

// Fetch all resources concurrently
async function fetchAllResources() {
  try {
    console.log('Starting concurrent requests...');
    const promises = paths.map((path) => fetchResource(path));
    const results = await Promise.all(promises);
    results.forEach((result, index) => {
      console.log(`Response for ${paths[index]}:\n`, result.slice(0, 50), '...\n'); // Print a snippet of each response
    });
    console.log('All resources fetched.');
  } catch (error) {
    console.error('Error fetching resources:', error);
  }
}

// Run the function to start the requests
fetchAllResources();
