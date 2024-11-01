import {EventEmitter} from "node:events"

const myEmitter = new EventEmitter()

myEmitter.on('event',()=>{
    console.log("first listener called")
})

myEmitter.on('event',(arg1,arg2)=>{
    console.log("Second listener called",arg1,arg2)
})

myEmitter.on('event',(...args)=>{
    const parms = args.join(',')
    console.log(`Multiple parameters called ${parms}`)
})

myEmitter.emit('event',1,2,3,4,5,"Ruhul amin")