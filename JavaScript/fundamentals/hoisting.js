"use strict";   // https://javascript.info/strict-mode

// Example 2 – var hoisting
console.log(a); // undefined (not error)
var a = 5;

console.log(b); // Uncaught ReferenceError ReferenceError: Cannot access 'b' before initialization
let b = 2;