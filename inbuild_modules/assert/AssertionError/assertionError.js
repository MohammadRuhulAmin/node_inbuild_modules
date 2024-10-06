import assert from "node:assert"

const {message, actual, expected, operator, generatedMessage,more} = new assert.AssertionError({
    actual: 1,                        // Actual value
    expected: 2,                      // Expected value
    operator: 'strictEqual',           // Operator used for comparison
    message: 'Custom error message',   // Custom message (optional)
    generatedMessage: false,           // Indicates if message was auto-generated
    stackStartFunction: ()=>{console.log('an error!')} ,  // Function where stack trace should start
});

console.log(message);           
console.log(actual);           
console.log(expected);          
console.log(operator);         
console.log(generatedMessage); 
