import {Buffer} from "node:buffer"


const str = "Node.js"
const buf = new Buffer.allocUnsafe(str.length)
console.log(buf)
for(let i =0;i<str.length;i++){
    buf[i] = str.charCodeAt(i)
}
console.log(buf.toString('utf8'));