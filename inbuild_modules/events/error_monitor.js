import { EventEmitter, errorMonitor } from "node:events";

const myEmitter = new EventEmitter();

myEmitter.on(errorMonitor,(err)=>{
    console.log(err.message)
});


myEmitter.on('Ruhul',()=>{
    console.log('Ruhul Called!')
});

myEmitter.on('error',()=>{
    console.log("error called!")
});

myEmitter.emit('Ruhul')

myEmitter.emit('error',new Error('opps'));