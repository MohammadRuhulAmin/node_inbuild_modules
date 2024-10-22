import cluster from 'node:cluster'

import http from 'node:http'

import { availableParallelism } from 'node:os'

import process from 'node:process'

console.log('This message is displayed first.')
for(let i = 0;i<10;i++){
    console.log(`The process ${i+1}`)
}

process.on('beforeExit',(code)=>{
    console.log("Start: ")
    for(let i = 0;i<10;i++){
        console.log(`The process ${i+1}`)
    }
    console.log('Process beforeExit event with code: ',code)
})

process.on('exit',(code)=>{
    console.log('process exit event with code:',code)
})

console.log('This message is displayed first.')
for(let i = 0;i<10;i++){
    console.log(`The process ${i+1}`)
}

