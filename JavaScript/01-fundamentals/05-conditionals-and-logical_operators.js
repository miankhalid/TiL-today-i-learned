"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * Conditional Operators and Logical Operators
 *
 * Conditional operators are used to perform different actions based on different conditions.
 * Logical operators are used to determine the logic between variables or values.
 *******************************************************************************/
console.log("================================== Conditionals and Logical Operators ==================================");

// The AND (&&) operator returns the first falsy value or the last value if none were found.
console.log("---------- AND (&&) Operator ----------");
console.log(undefined && NaN && null); // Output: undefined
console.log("0" && "no matter what"); // Output: "no matter what"

// The OR (||) operator returns the first truthy value or the last value if none were found.
console.log("---------- OR (||) Operator ----------");
console.log(undefined || null || NaN); // Output: NaN
console.log(console.log(1) || 2 || console.log(3)); // Output: 1, then 2 (because console.log returns undefined)

// The NOT (!) operator converts the operand to a boolean type and returns the inverse.
console.log("---------- NOT (!) Operator ----------");
console.log(!undefined); // Output: true
console.log(!"non-empty string"); // Output: false

// The nullish coalescing operator (??) returns the right-hand side operand when the left-hand side is null or undefined.
// let x = 1 && 2 ?? 3; // This will throw a SyntaxError because && and ?? cannot be used together without parentheses.