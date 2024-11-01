import {EventEmitter} from "node:events"
const eventEmit = new EventEmitter()

function myListener(){
    console.log('listener Executed')
}

eventEmit.on('test',myListener)
eventEmit.emit('test')

eventEmit.off('test',myListener)

eventEmit.emit('test')
