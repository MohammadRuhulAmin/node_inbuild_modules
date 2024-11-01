import {EventEmitter} from "node:events"
const eventEmitter = new EventEmitter()


eventEmitter.on('removeListener',(event,listener)=>{
    console.log(`${event} has been removed`)
});

function testFunc(){
    console.log('test function will be removed!')
}

eventEmitter.on('test',testFunc)
eventEmitter.emit('test')
eventEmitter.emit('test')
eventEmitter.emit('test')
eventEmitter.removeListener('test',testFunc)
