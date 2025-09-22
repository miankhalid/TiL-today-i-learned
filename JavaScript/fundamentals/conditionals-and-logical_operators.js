"use strict";   // https://javascript.info/strict-mode

console.log("## Monkey testing")
console.log(undefined && NaN && null) // first is printed for &&
console.log(undefined && NaN || null) // last is printed for ||

console.log( "0" && "no matter what" ); 
console.log(Boolean(undefined)); 
console.log(!undefined); 
console.log( !"non-empty string" ); // false
console.log( console.log(1) || 2 || console.log(3) );
console.log( console.log(1) && 2 && console.log(3) );

// let x = 1 && 2 ?? 3; // Syntax error


