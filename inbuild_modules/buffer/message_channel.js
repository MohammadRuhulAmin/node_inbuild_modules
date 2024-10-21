import {Buffer} from "node:buffer"
import { setTimeout as delay } from "node:timers/promises"

const blob = new Blob(['Hellow World'])

const mc1 =new MessageChannel();
const mc2 =new MessageChannel();

mc1.port1.onmessage = async ({ data }) => {
    console.log(await data.text());
    mc1.port1.close();
  };
  
  mc2.port1.onmessage = async ({ data }) => {
    await delay(1000);
    console.log(await data.text());
    mc2.port1.close();
  };
  
  mc1.port2.postMessage(blob);
  mc2.port2.postMessage(blob);
  
  console.log("---------------")
  blob.text().then(console.log);