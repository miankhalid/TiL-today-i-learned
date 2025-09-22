"use strict";   // https://javascript.info/strict-mode

/**
 * data types
 */ 
// alert( Infinity ); 
// alert( "not a number" / 2 ); //NaN
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992

// the "n" at the end means it's a BigInt
let bigInt = 1234567890123456789012345678901234567890n;
console.log(bigInt + 2n);

// strings
let str = "Hello";
let str2 = 'Single quotes are ok too ';
let phrase = `can embed another ${str}`;
console.log(phrase);
console.log(`${str} asdfaasdfasdfasdfs`);

// booleans
let four = 4;
let afour = 4;
console.log(four = afour);
console.log(four == afour);
console.log(four === afour);

// null
let age = null;
console.log("age is: " + age + 1234567890123456789012345678901234567890n);
// change the value to undefined
age = undefined;
console.log("age is: " + age);

// undefined
let unk;
console.log(unk + str + four + age); // undefinedHello4null

// typeof
console.log(typeof undefined) // "undefined"

console.log(typeof 0) // "number"

console.log(typeof 10n) // "bigint"

console.log(typeof true) // "boolean"

console.log(typeof "foo") // "string"

console.log(typeof Symbol("id")) // "symbol"

console.log(typeof Math) // "object"  (1)

console.log(typeof null) // "object"  (2)

console.log(typeof afunc) // "function"  (3)

function afunc() {
    13 + 12
}