import {EventEmitter} from "node:events"

let m = 0;

const myEvent = new EventEmitter()

myEvent.on('sum',()=>{
    console.log('Addision')
    m++;
})

myEvent.emit('sum')

console.log(m);

myEvent.emit('sum')
myEvent.on('error',()=>{
    const err = new Error('oops! there is an error')
    setImmediate(()=>{
        console.log(err.message)
    })
})
myEvent.emit('error')
console.log(m)