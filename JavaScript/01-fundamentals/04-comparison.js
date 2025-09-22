"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * Comparison Operators
 *
 * JavaScript has both strict (===) and non-strict (==) comparison operators.
 * It is generally recommended to use the strict equality operator.
 *******************************************************************************/
console.log("================================== Comparison Operators ==================================");

// String comparison is done character-by-character.
console.log("---------- String Comparison ----------");
console.log("b" > "B"); // Output: true (lowercase 'b' has a larger index in Unicode)

// When comparing values of different types, JavaScript converts the values to numbers.
console.log("---------- Non-Strict Equality (==) ----------");
let a = 0;
console.log(Boolean(a)); // Output: false
let b = "0";
console.log(Boolean(b)); // Output: true
console.log(a == b); // Output: true (string "0" becomes number 0)

console.log(0 == false); // Output: true
console.log('' == false); // Output: true

// Strict equality checks for equality without type conversion.
console.log("---------- Strict Equality (===) ----------");
console.log(0 === false); // Output: false (different types)
console.log(null === undefined); // Output: false (different types)

// null and undefined are equal to each other with non-strict equality.
console.log("---------- null vs undefined ----------");
console.log(null == undefined); // Output: true