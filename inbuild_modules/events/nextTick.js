import { EventEmitter } from 'events';
const myEE = new EventEmitter();

// Listener for 'bar' event
myEE.on('bar', () => {
  console.log('Event "bar" was emitted');
});

// Listener for 'foo' event
myEE.on('foo', () => {
  console.log('Event "foo" was emitted');
});

// Use process.nextTick to schedule the event emissions
process.nextTick(() => {
  myEE.emit('bar'); // Emit 'bar' event
  myEE.emit('foo'); // Emit 'foo' event
});

console.log('This log appears first in the main script');
