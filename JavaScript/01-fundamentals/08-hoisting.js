"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * Hoisting
 *
 * Hoisting is JavaScript's default behavior of moving declarations to the top.
 *******************************************************************************/
console.log("================================== Hoisting ==================================");

// Variables declared with 'var' are hoisted and initialized with 'undefined'.
console.log("---------- 'var' Hoisting ----------");
console.log(a); // Output: undefined
var a = 5;
console.log(a); // Output: 5

// Variables declared with 'let' and 'const' are hoisted but not initialized.
// Accessing them before the declaration results in a ReferenceError.
console.log("---------- 'let' and 'const' Hoisting ----------");
// console.log(b); // Uncaught ReferenceError: Cannot access 'b' before initialization
let b = 2;
console.log(b); // Output: 2
