import {EventEmitter} from "node:events"


const myEmitter = new EventEmitter();

myEmitter.on('async',(a,b)=>{
    setTimeout(()=>{
        console.log('This is called 2000')
    },2000)
    setImmediate(()=>{
        console.log('This is async request!')
    });
    setTimeout(()=>{
        console.log('async called!', a , b)
    },1000)
    

});


myEmitter.emit('async','A','B')