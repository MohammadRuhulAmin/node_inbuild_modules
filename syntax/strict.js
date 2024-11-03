/**
 * 
 * In Node.js (and JavaScript in general), the "use strict"; 
 * directive is used to enable strict mode, 
 * which changes how JavaScript executes and enforces a more secure coding practice. Here’s why it’s beneficial:

    Prevents Undeclared Variables: In strict mode, assigning a value to a variable that hasn’t been declared will throw an error. For example:

    javascript

x = 3.14; // Throws an error in strict mode

This helps catch typos or accidental undeclared variables.

Eliminates Silent Errors: Some actions that would otherwise fail silently in normal 
mode will throw errors in strict mode. For example, assigning to a non-writable property:

javascript

const obj = {};
Object.defineProperty(obj, "prop", { value: 42, writable: false });
obj.prop = 77; // Error in strict mode

Restricts this in Functions: In strict mode, this is undefined in functions that are not methods of an object.
This avoids common mistakes with this referencing the global object (global in Node.js) unintentionally.

Disallows Duplicates in Object Literals and Function Parameters: For example:

javascript
    function sum(a, a, c) { // SyntaxError in strict mode
      return a + a + c;
    }
    Disallows Octal Syntax: Octal literals (010) are not allowed in strict mode, which avoids potential confusion in numeric values.

Why Use It in Node.js?

Enabling strict mode is a best practice for Node.js and JavaScript applications, especially as it makes your code more predictable and reduces common mistakes. Although Node.js automatically applies strict mode in ES6 modules (.mjs files or files using import/export syntax), it's still common to use "use strict"; in CommonJS modules for the same benefits.
How to Use It?

Add "use strict"; at the top of your JavaScript files or functions:

javascript

'use strict';

function example() {
  x = 3.14; // This will throw an error
}

In summary, strict mode helps enforce cleaner, more secure, and less error-prone code in Node.js applications.

 */

'use strict';

function example(){
 let x = 3.14;
    console.log(x)
}
example()
