"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * Functions
 *
 * Functions are one of the fundamental building blocks in JavaScript.
 * A function is a JavaScript procedure—a set of statements that performs a task or calculates a value.
 *******************************************************************************/
console.log("================================== Functions ==================================");

// Function Declaration
console.log("---------- Function Declaration ----------");
function sayHi() {
  console.log("Hello");
}
sayHi(); // Output: Hello

// Functions can be copied to other variables.
console.log("---------- Copying Functions ----------");
let func = sayHi;
func(); // Output: Hello

/*******************************************************************************
 * Arrow Functions
 *
 * Arrow functions are a more concise syntax for writing function expressions.
 *******************************************************************************/
console.log("================================== Arrow Functions ==================================");

// Single-line arrow function.
console.log("---------- Single-line Arrow Function ----------");
let sum = (a, b) => a + b;
console.log(sum(1, 2)); // Output: 3

// Arrow function with one argument.
let double = n => n * 2;
console.log(double(3)); // Output: 6

// Arrow function with no arguments.
let sayHello = () => console.log("Hello!");
sayHello(); // Output: Hello!

// Multi-line arrow function.
console.log("---------- Multi-line Arrow Function ----------");
let multilineSum = (a, b) => {
  let result = a + b;
  return result;
};
console.log(multilineSum(1, 2)); // Output: 3

// Arrow functions do not have their own 'this'. They inherit it from the parent scope.
console.log("---------- Arrow Functions and 'this' ----------");
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],
  showList() {
    this.students.forEach(
      student => console.log(this.title + ': ' + student)
    );
  }
};
group.showList();
// Output:
// Our Group: John
// Our Group: Pete
// Our Group: Alice
