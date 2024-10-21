function firstFunction() {
    secondFunction();
}

function secondFunction() {
    //console.trace('Show me');
}

firstFunction();


console.time('bunch-of-stuff');
setTimeout(()=>{
    console.log("Running... ")
},5000)
console.timeEnd('bunch-of-stuff');