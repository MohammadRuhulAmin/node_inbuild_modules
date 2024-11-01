import {EventEmitter} from "node:events"
const myEvent = new EventEmitter()

myEvent.on('event',(firstArg,secondArg)=>{
    console.log(firstArg, secondArg)
});



myEvent.emit('event',12,33)