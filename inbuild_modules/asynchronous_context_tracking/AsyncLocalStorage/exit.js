import {AsyncLocalStorage} from "node:async_hooks"

const store = {id:1}
const asyncLocalStorage = new AsyncLocalStorage()
asyncLocalStorage.enterWith(store)
console.log("Before exit() method apply: ")
console.log(asyncLocalStorage.getStore())

asyncLocalStorage.exit(() => {
    asyncLocalStorage.getStore(); // Returns undefined
    throw new Error();
  });

  /**
   * 
   * It is under development, instead of using exit we will use disable() method to unset a localStorage
   */