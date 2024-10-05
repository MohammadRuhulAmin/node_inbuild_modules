import assert from 'node:assert'

const tracker = new assert.CallTracker();

function func(){}

const callsfunc = tracker.calls(func,2);
callsfunc()
callsfunc()
console.log(tracker.report())