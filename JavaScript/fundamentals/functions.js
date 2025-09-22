"use strict";   // https://javascript.info/strict-mode

function sayHi() {   // (1) create
  console.log( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) run the copy (it works)!
console.log(func);
sayHi(); // Hello    //     this still works too (why wouldn't it)

// Arrow functions =>
/* This arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/
let sum = (a, b) => a + b;
console.log( sum(1, 2) ); // 3

// roughly the same as: let double = function(n) { return n * 2 }
let double = n => n * 2;
console.log( double(3) ); // 6

// If there are no arguments, parentheses are empty, but they must be present:
let sayHello = () => console.log("Hello!");
sayHello();

multiline_arrow_func: {
    // Multiline arrow functions
    let sum = (a, b) => {  // the curly brace opens a multiline function
    let result = a + b;
    return result; // if we use curly braces, then we need an explicit "return"
    };

    console.log( sum(1, 2) ); // 3
}

arrow_func_adv: {
    let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(
        student => console.log(this.title + ': ' + student)
        );
    }
    };
    console.log(typeof group);
    group.showList();

}