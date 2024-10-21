import { Console } from 'node:console';
import { createWriteStream } from 'node:fs';

// Use the default console.warn
const name = 'Will Robinson';
console.warn(`Danger ${name}! Danger!`);

// Create writable streams for output and error
const out = createWriteStream('./out.log');
const err = createWriteStream('./err.log');

// Create a new Console instance using the custom streams
const myConsole = new Console(out, err);

// Log messages to the custom streams
myConsole.log('hello world');  // This will be written to 'out.log'
myConsole.error('An error occurred');  // This will be written to 'err.log'
