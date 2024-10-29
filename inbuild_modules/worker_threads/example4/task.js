

import {getEnvironmentData, parentPort} from "node:worker_threads"

let data = getEnvironmentData('json')

parentPort.postMessage(data)