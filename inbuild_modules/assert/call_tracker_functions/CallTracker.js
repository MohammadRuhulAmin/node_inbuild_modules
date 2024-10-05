import assert from 'node:assert'
import process from 'node:process'
const log = (...args) => console.log(...args);
const tracker = new assert.CallTracker();

function func(){
    log('func called!')
}



const callsfunc = tracker.calls(func,2);

callsfunc()
function a(){
    log('function a')
}
function b(){
    log('function b')
}
callsfunc()
b()
a()


/**
 * In Node.js, the process.on('exit', callback) event is used to register a listener that is invoked when the Node.js process is about to exit. 
 * It allows you to run some final synchronous operations just before the process ends. 
 * This can be helpful for cleanup tasks, logging, or verifying certain conditions before the program finishes.
 */
process.on('exit',()=>{
    try{
        tracker.verify()
    }catch(error){
        if (error instanceof  assert.AssertionError){
            log(`Error : ${error.message}`)
        }
    }
    
    
});