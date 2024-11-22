import http from "node:http"

const req = http.request((req,res)=>{})
req.cork() // begin beffering
req.write('chunk 1')// data is buffered, not sent yet
req.write('chunk 2')// data is buffered not sent yet
req.write('chunk 3')// data is buffered not sent yet
req.uncork() // all the data will be sent in one go 