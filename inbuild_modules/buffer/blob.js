import {Blob} from "node:buffer"

const blob = new Blob(['Hellow world'])

// The ArrayBuffer object is used to represent a generic raw binary data buffer.
console.log("size of the blob: ",blob.size)
blob.arrayBuffer().then((buffer) => {
    const bytes = new Uint8Array(buffer);
    console.log(bytes);
});


const blobx = new Blob(['this is first text','second text'])
blobx.text().then((text)=>{
    console.log(`${text}`)
})

