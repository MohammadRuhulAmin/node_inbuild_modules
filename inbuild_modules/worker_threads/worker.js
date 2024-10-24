import {
    Worker, isMainThread, setEnvironmentData, getEnvironmentData
} from "node:worker_threads";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
/** Sharing data between main thread and worker thread! */

if (isMainThread) {
    // Set shared environment data with the key 'Hellow'
    setEnvironmentData("Hellow", "World!");
    // Create a new worker thread
    //new Worker(__filename)
    console.log("Main Thread is running!")

} else {
    // Get the environment data using the correct key 'Hellow'
    console.log(getEnvironmentData("Hellow"));  // Prints 'World!'
}
