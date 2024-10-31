import {EventEmitter} from 'node:events'

const event = new EventEmitter()

event.on('sayName',(name,email)=>{
    console.log(name,email)
})

event.on('sayName',(name,email)=>{
    console.log(name,email)
})
event.on('sayName',(name,email)=>{
    console.log(name,email)
})

event.emit('sayName','RuhulAmin','email@g.com')
event.emit('sayName','Sakib','s@gm.com')
