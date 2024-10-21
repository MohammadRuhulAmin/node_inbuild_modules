<<<<<<< HEAD
/**
 * A buffer in Node.js is a temporary memory storage area
 *  designed to handle raw binary data.
 *  Buffers are particularly useful for handling 
 * streams of data from I/O operations, 
 * such as when reading from a file or receiving data over a network.
=======
/***
 * A buffer in Node.js is a temporary memory storage area 
 * designed to handle raw binary data. 
 * Buffers are particularly useful for handling streams of data from I/O operations,
 *  such as when reading from a file or receiving data over a network.
>>>>>>> 2dfe7eeed533c465207dfe07217e16810bab979e

Here’s why buffers are important and how they work:
Key Points:

    Raw Data: Buffers can store raw binary data, unlike standard JavaScript strings, which are designed for text data.
    Fixed Size: A buffer has a fixed size, and once created, its size cannot be changed.
    Efficient Data Handling: Buffers allow efficient handling of binary data in situations where performance is critical, such as with file streams, network operations, or image processing.
<<<<<<< HEAD
    Node.js and Buffers: In Node.js, buffers are particularly 
    useful for working with TCP streams, file system data,
    and any other type of binary data.

Common Use Cases for Buffers:

    Reading Files: Reading files in chunks from disk 
    (instead of loading an entire file into memory at once).
    Network Operations: Receiving data from a TCP or WebSocket connection.
    Binary Data: Processing images, audio, or any other binary format.
 * 
 */


import {Buffer} from "node:buffer"
// create buffer of 100 bytes,with initializing default 0 value
const buf1 = Buffer.alloc(100);
buf1.write("Hellow world!")
console.log(buf1.toString())

const buf2 = Buffer.alloc(10,5);
console.log(buf2)

//const buf3 = Buffer.allocUnsafe()

const buf4 = Buffer.from([1,2,3]) // it will create a 3 bytes of buffer
const buf5 = Buffer.from([1,2,3,4,5]) // it will create a 5 bytes of buffer
buf5.write("Hi this is a good string")
console.log(buf4,buf5.toString())
=======
    Node.js and Buffers: In Node.js, buffers are particularly useful for working with TCP streams, file system data, and any other type of binary data.

Common Use Cases for Buffers:

    Reading Files: Reading files in chunks from disk (instead of loading an entire file into memory at once).
    Network Operations: Receiving data from a TCP or WebSocket connection.
    Binary Data: Processing images, audio, or any other binary format.

Example:

js

const buf = Buffer.alloc(5);  // Creates a buffer of 5 bytes initialized to zero
buf.write('hello');           // Writes the string 'hello' to the buffer
console.log(buf.toString());  // Outputs: 'hello'

In this example:

    The buffer is allocated with 5 bytes of space.
    The string 'hello' is written into the buffer.
    We use toString() to convert the buffer back to a string for display.

Buffers are fundamental for managing binary data in an efficient way in Node.js.
 * 
 */

import {Buffer} from 'node:buffer';

const buf = Buffer.from('hellow world','utf8')
const buf1 = Buffer.alloc(10,1);
const buf2 = Buffer.from([1,2,3,4,5]) // allocating array of 5 bytes 
buf2.write("Hi this is ruhul amin")
console.log(buf2.toString()) 

/**
 * The line const buf5 = Buffer.from([257, 257.5, -255, '1']); creates a buffer in Node.js with values provided in the array. However, there are some important points to consider about how the values are processed before being stored in the buffer.
How Buffer.from([ ... ]) Works:

    Values Over 255 or Below 0: A buffer stores bytes, which are numbers between 0 and 255 (1 byte = 8 bits). When a number larger than 255 or smaller than 0 is passed, it is wrapped or converted using modulo 256. For example:
        257: This number will be wrapped to 257 % 256 = 1.
        257.5: Floats are truncated to integers, so 257.5 will be treated as 257, and then wrapped to 1.
        -255: Negative numbers are also wrapped. -255 will become -255 % 256 = 1.

    Non-Numeric Values (Strings, Objects): When a non-numeric value like a string is passed to Buffer.from(), it is implicitly converted to a number.
     For the string '1', it is first converted to the number 1.
 */
const buf5 = Buffer.from([257, 257.5, -255, '1']);
console.log("buf5: ",buf5)

/***
 * Numbers greater than 255 or less than 0 are wrapped within the range of 0 to 255.
Floats are truncated to integers.
Strings are converted to numbers if possible, otherwise they'll default to 0 if the conversion fails.
 * 
 */

/**r, each character is encoded in UTF-8 (by default). UTF-8 uses one byte for simple ASCII characters (like t and s), but it uses more bytes for non-ASCII characters (like é).

    The characters t and s are ASCII characters and are each encoded as a single byte.
    The character é is a non-ASCII character and is encoded as two bytes in UTF-8. */
const buf6 = Buffer.from('tést');
console.log(buf6)

const buf7 = Buffer.from('Hellow World','utf-8')
console.log(buf7)
console.log(buf7.toString())
console.log(buf7.toString('hex'))

const buf8 = Buffer.from('Hellow World','hex')


const buf9 = Buffer.from([1, 2, 3, 4]);
const uint32array = new Uint32Array(buf9);

console.log(uint32array);

const arr = new Uint32Array([10, 20, 30, 40, 50]);
console.log(arr);

const bufferx = Buffer.from([1,2,3,4,5])
for(const b of bufferx){
    console.log(b)
}
>>>>>>> 2dfe7eeed533c465207dfe07217e16810bab979e
