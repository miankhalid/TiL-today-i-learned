"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * Type Conversions
 *
 * Most of the time, operators and functions automatically convert the values
 * given to them to the right type.
 *******************************************************************************/
console.log("================================== Type Conversions ==================================");

// String to Number: When a mathematical operation is applied to strings, they are converted to numbers.
console.log("---------- String to Number ----------");
console.log("6" / "2"); // Output: 3

// Explicit conversion to Number
console.log("---------- Explicit Conversion to Number ----------");
let age = Number("an arbitrary string instead of a number");
console.log(age); // Output: NaN

// Number to String: Concatenation with a string converts numbers to strings.
console.log("---------- Number to String ----------");
console.log(4 + 5 + "px"); // Output: "9px"