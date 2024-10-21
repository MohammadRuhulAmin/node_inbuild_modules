import { AsyncLocalStorage } from "async_hooks"
const asyncLocalStorage = new AsyncLocalStorage();


const store = { id: 1,email:"ruhul@ba-systems.com",contact:'+833-85522' };
asyncLocalStorage.enterWith(store);
asyncLocalStorage.getStore(); 

setTimeout(()=>{
    console.log(asyncLocalStorage.getStore())
},100)

/**
 * The enterWith() function in the AsyncLocalStorage API is used to establish a context for asynchronous operations.
 *  This context is a store (a key-value object) that can be shared across 
 * asynchronous tasks without having to pass it explicitly through function parameters.
 * 
 */



