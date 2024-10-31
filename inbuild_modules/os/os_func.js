import os from 'node:os'

// Using os.EOL to append platform-specific end-of-line characters
const multilineString = `Line 1${os.EOL}Line 2${os.EOL}Line 3`;
const myParagraph = `This is the first text ${os.EOL}This is the second Text ${os.EOL}`
console.log(multilineString);

console.log(myParagraph)


console.log("Available parallel threads")

const parallelism = os.availableParallelism();

/**In Node.js, parallelism typically refers to the number of tasks or threads the system can execute simultaneously. */
console.log(`Available parallelism: ${parallelism}`);

console.log(os.cpus())

console.log(os.devNull)

console.log(os.freemem())

console.log(os.homedir())

console.log(os.hostname())
console.log(os.loadavg())
console.log(os.machine())

console.log(os.networkInterfaces())
console.log(os.platform())

console.log(os.totalmem())

console.log(os.type())

console.log(os.uptime())

console.log(os.userInfo())