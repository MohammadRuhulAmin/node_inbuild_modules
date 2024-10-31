
import {EventEmitter} from "node:events"

const ev = new EventEmitter()

function func(){
    console.log("round trip time!")
}

ev.on('x',func) /** listener */
ev.once('x',func)
ev.removeListener('x',func)

ev.emit('x')
console.log('called')
ev.emit('x')