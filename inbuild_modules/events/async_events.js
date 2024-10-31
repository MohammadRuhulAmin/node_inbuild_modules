import {EventEmitter} from "node:events"

const myEvent = new EventEmitter()

myEvent.on('getinfo',async()=>{
    console.log('this is async event!')
})
myEvent.on('postinfo',()=>{
    console.log('this is sync event!')
})


myEvent.emit('getinfo')
myEvent.emit('postinfo')