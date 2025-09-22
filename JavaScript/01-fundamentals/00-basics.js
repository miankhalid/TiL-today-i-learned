"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * JavaScript Basics
 *
 * This file covers some of the basic syntax of JavaScript.
 *******************************************************************************/
console.log("================================== JavaScript Basics ==================================");

// Semicolons are generally optional in JavaScript, but it's a good practice to use them.
// In some cases, omitting them can lead to unexpected results.
console.log("---------- Semicolons ----------");
console.log("Hello"); // Output: Hello
[1, 2].forEach(item => console.log(item)); // Output: 1, then 2

// Without a semicolon, the engine might misinterpret the code.
// For example:
// console.log("Hello")[1, 2].forEach(item => console.log(item));
// This would be treated as one statement and would likely cause an error.