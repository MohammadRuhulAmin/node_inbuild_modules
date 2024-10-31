import { Worker } from 'node:worker_threads';

// DECLARING NUMBER OF THREADS TO BE USED IN THE APPLICATION
export const THREAD_COUNT = 4;

export function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./task/task_a.js', {
      workerData: {
        thread_count: THREAD_COUNT,
      },
    });

    worker.on('message', (data) => {
      resolve(data);
    });

    worker.on('error', (err) => {
      reject(`Error occurred: ${err}`);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
