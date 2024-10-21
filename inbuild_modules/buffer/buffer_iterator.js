import {Buffer} from "node:buffer"
const buf = Buffer.from([1,2,3,4])

for(const b of buf){
    console.log(b)
}

const iterator = buf.entries();

for (const [index, value] of iterator) {
  console.log(index, value);  // Outputs: 0 10, 1 20, 2 30, 3 40
}

const iteratorx = buf.keys();

for (const key of iteratorx) {
  console.log(key);  // Outputs: 0, 1, 2, 3
}