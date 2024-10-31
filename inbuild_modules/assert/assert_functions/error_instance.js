
import assert from "node:assert/strict"

var invalidNum = ()=>{
  throw new Error("invalid Number")
};

var func = (a)=>{
  if (a>10)invalidNum()
  else console.log("valid")
}

assert.throws(()=>{
  func(111)
});


// assert.throws() is used to check that an error is thrown, 
//but it does not print the error because it's designed to catch it for validation.

