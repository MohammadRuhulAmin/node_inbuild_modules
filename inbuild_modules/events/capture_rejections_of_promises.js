import {EventEmitter} from 'node:events'

const ee1 = new EventEmitter({
    captureRejections:true 
});

ee1.on('myEvent',async(value)=>{
    throw new Error('This is an Error!')
});

ee1.on('error',console.log);

const ee2 = new EventEmitter({captureRejections:true})
ee2.on('myEvent',async(value)=>{
    throw new Error('This is an Error!')
})

ee2[Symbol.for('nodejs.rejection')] = console.log;