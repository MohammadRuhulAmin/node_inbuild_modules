import { readFileSync } from 'node:fs';
import { URL } from 'url';

const filePath = new URL('../tmp/big.txt', import.meta.url);
console.log(filePath)
const data = readFileSync(filePath, 'utf8'); // specify encoding if you want a string

console.log(data)

