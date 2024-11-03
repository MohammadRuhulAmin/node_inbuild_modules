import {open} from 'node:fs/promises'


const file = await open('../tmp/big.txt')

for await (const line of file.readLines()){
    console.log(line)
}