import {EventEmitter} from "node:events"
const myEmitter = new EventEmitter();
// Only do this once so we don't loop forever
myEmitter.once('newListener',(event,listener)=>{
    /** inserting a new listener */
    if(event === 'event'){
        myEmitter.on('event',()=>{
            console.log('B')
        })
    }
});

myEmitter.on('event',()=>{
    console.log('A')
})

myEmitter.emit('event')

