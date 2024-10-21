function firstFunction() {
    secondFunction();
}

function secondFunction() {
    console.trace('Show me');
}

firstFunction();
