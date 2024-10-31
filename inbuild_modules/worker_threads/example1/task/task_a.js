import {parentPort} from "node:worker_threads"

let result = 0;
for(let i = 0;i<10000000000;i++)result++;

// for main thread and worker thread communication
parentPort.postMessage(result);
