import {AsyncLocalStorage} from "node:async_hooks"

const asyncLocalStorage = new AsyncLocalStorage()


const store = {id:1}

asyncLocalStorage.run(store,()=>{
    console.log("Inside the context: ")
    console.log(asyncLocalStorage.getStore())

});

asyncLocalStorage.disable();
console.log("After disabling:")
console.log(asyncLocalStorage.getStore())