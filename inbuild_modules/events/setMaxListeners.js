import {EventEmitter} from "node:events"

const emitter = new EventEmitter();

emitter.setMaxListeners(50); // Set a custom limit for demonstration

// Add multiple listeners
for (let i = 0; i < 20; i++) {
  emitter.on('myEvent', () => {
    console.log('Listener', i + 1);
  });
}

// Emitting 'myEvent' will print the warning due to exceeding the limit
emitter.emit('myEvent'); 
