/**
 * A buffer in Node.js is a temporary memory storage area
 *  designed to handle raw binary data.
 *  Buffers are particularly useful for handling 
 * streams of data from I/O operations, 
 * such as when reading from a file or receiving data over a network.

Here’s why buffers are important and how they work:
Key Points:

    Raw Data: Buffers can store raw binary data, unlike standard JavaScript strings, which are designed for text data.
    Fixed Size: A buffer has a fixed size, and once created, its size cannot be changed.
    Efficient Data Handling: Buffers allow efficient handling of binary data in situations where performance is critical, such as with file streams, network operations, or image processing.
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