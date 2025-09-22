"use strict";   // https://javascript.info/strict-mode

console.log("b" > "B"); // true -- Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode).

let a = 0;
console.log( Boolean(a) ); // false

let b = "0";
console.log( Boolean(b) ); // true
console.log(a == b); // true!

console.log("## Strict type equality");
console.log( 0 == false ); // true
console.log( '0' == false ); // true
console.log( '' == false ); // true

console.log("## Strict type equality - 2");
console.log( 0 === false ); // false, because the types are different
console.log( (null || undefined || NaN) !== false ); // true, because the types are different
console.log( `FALSE` === `false` ); // false, because the values are different
console.log( 0 !== '0' ); // true, because the types are different

console.log("## Comparison with null, NaN and undefined")
console.log( undefined == NaN ); // false
console.log( undefined == null ); // true
console.log( NaN == null ); // false

console.log("## Mathematical Comparison with null, NaN and undefined")
console.log( NaN >= 0 ); // false
console.log( null >= 0 ); // true
console.log( undefined >= 0 ); // false
console.log("");

