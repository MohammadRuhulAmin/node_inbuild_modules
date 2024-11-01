/**
 * 
 * EventTarget API is commonly found in web browsers, and it provides methods to add, remove, dispatch events on any object.
 * 
 */

// Step 1: Create an EventTarget instance

const target = new EventTarget();

// Step 2: Add an event listener for the 'greet' event
target.addEventListener('greet', (event) => {
  console.log(`Hello, ${event.detail.name}!`);
});

// Step 3: Create and dispatch the 'greet' event with custom data
const greetEvent = new CustomEvent('greet', {
  detail: { name: 'Alice' }
});

target.dispatchEvent(greetEvent);
