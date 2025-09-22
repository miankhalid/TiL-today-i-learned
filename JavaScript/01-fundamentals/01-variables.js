"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * Variables
 *
 * In JavaScript, variables are used to store data. They can be declared with
 * `let`, `var`, or `const`.
 *******************************************************************************/

// 'let' allows you to declare block-scoped local variables.
console.log("================================== Variables ==================================");
let message = "some string";
console.log(message); // Output: some string

// 'var' declares a variable, optionally initializing it to a value.
// 'var' declarations are globally scoped or function scoped.
var aVar = "a var";
console.log(aVar); // Output: a var

// Using "use strict" mode helps in writing cleaner code, and prevents using undeclared variables.
// The following line would cause an error in strict mode.
// num = 4; // Uncaught ReferenceError: num is not defined