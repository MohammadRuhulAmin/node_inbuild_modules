import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

class Foo {
    #runInAsyncScope = AsyncLocalStorage.snapshot();
  
    get() { return this.#runInAsyncScope(() => asyncLocalStorage.getStore()); }
  }
  
  const foo = asyncLocalStorage.run(123, () => new Foo());
  console.log(asyncLocalStorage.run(321, () => foo.get())); // returns 123