"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * Data Types
 *
 * JavaScript has 8 data types:
 * 1. String: for textual data.
 * 2. Number: for numbers of any kind: integer or floating-point.
 * 3. BigInt: for integer numbers of arbitrary length.
 * 4. Boolean: for true/false.
 * 5. null: for unknown values – a standalone type that has a single value null.
 * 6. undefined: for unassigned values – a standalone type that has a single value undefined.
 * 7. Symbol: for unique identifiers.
 * 8. Object: for more complex data structures.
 *******************************************************************************/
console.log("================================== Data Types ==================================");

// The 'number' type represents both integer and floating-point numbers.
console.log("---------- Number ----------");
console.log(Infinity); // Output: Infinity
console.log("not a number" / 2); // Output: NaN
// Numbers in JavaScript have a limit, MAX_SAFE_INTEGER
console.log(9007199254740991 + 1); // Output: 9007199254740992
console.log(9007199254740991 + 2); // Output: 9007199254740992 (loses precision)

// 'BigInt' is for numbers larger than MAX_SAFE_INTEGER.
console.log("---------- BigInt ----------");
let bigInt = 1234567890123456789012345678901234567890n;
console.log(bigInt + 2n); // Output: 123456789012345678901234567890123456791n

// 'String' for text.
console.log("---------- String ----------");
let str = "Hello";
let phrase = `can embed another ${str}`;
console.log(phrase); // Output: can embed another Hello
console.log(`${str} world`); // Output: Hello world

// 'Boolean' is for true/false values.
console.log("---------- Boolean ----------");
let four = 4;
let aFour = 4;
console.log(four == aFour); // Output: true
console.log(four === aFour); // Output: true

// 'null' represents the intentional absence of any object value.
console.log("---------- null ----------");
let age = null;
console.log(age); // Output: null

// 'undefined' means a variable has been declared but has not yet been assigned a value.
console.log("---------- undefined ----------");
let unk;
console.log(unk); // Output: undefined

// The 'typeof' operator returns the data type of its operand.
console.log("---------- typeof Operator ----------");
console.log(typeof undefined); // Output: "undefined"
console.log(typeof 0); // Output: "number"
console.log(typeof 10n); // Output: "bigint"
console.log(typeof true); // Output: "boolean"
console.log(typeof "foo"); // Output: "string"
console.log(typeof Symbol("id")); // Output: "symbol"
console.log(typeof Math); // Output: "object"
console.log(typeof null); // Output: "object" (this is a historical bug in JS)
function aFunc() {}
console.log(typeof aFunc); // Output: "function" (functions are objects in JS)
