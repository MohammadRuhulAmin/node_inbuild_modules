import {EventEmitter} from "node:events"
const myEvent = new EventEmitter()

function listener1(){
    console.log('first Listener')
}

function listener2(){
    console.log('second Listener')
}

myEvent.on('event-1',listener1)
myEvent.on('event-1',listener2)


myEvent.emit('event-1')

myEvent.removeAllListeners('event-1')
myEvent.emit('event-1')