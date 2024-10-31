import {EventEmitter} from 'node:events'

const ev = new EventEmitter()

ev.on('test',()=>{
    console.log('second')
})

ev.prependListener('test',()=>{
    console.log('first')
})

ev.emit('test')