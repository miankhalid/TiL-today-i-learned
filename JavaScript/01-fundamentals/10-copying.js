"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * Copying Objects
 *
 * In JavaScript, objects are reference types. When you copy an object,
 * you can either create a shallow copy or a deep copy.
 *******************************************************************************/
console.log("================================== Copying Objects ==================================");

/*******************************************************************************
 * Shallow Copy
 *
 * A shallow copy of an object is a copy whose properties share the same references
 * as those of the source object from which the copy was made.
 *******************************************************************************/
console.log("================================== Shallow Copy ==================================");

// Direct assignment just copies the reference.
console.log("---------- Direct Assignment (Not a copy) ----------");
let obj1 = { a: 1, b: 2 };
let obj2 = obj1;
obj2.b = 5;
console.log(obj1.b); // Output: 5 (original object is modified)

// The spread operator (...) creates a new object with the same properties.
// However, nested objects are still shared by reference.
console.log("---------- Spread Operator (...) ----------");
const spreadObj1 = { a: 1, b: { c: 2 } };
const spreadObj2 = { ...spreadObj1 };
spreadObj2.b.c = 99;
console.log(spreadObj1.b.c); // Output: 99 (nested object is modified)

// Object.assign() copies all enumerable own properties from one or more source objects to a target object.
// It also creates a shallow copy.
console.log("---------- Object.assign() ----------");
const assignObj1 = { a: 1, b: { c: 2 } };
const assignObj2 = Object.assign({}, assignObj1);
assignObj2.b.c = 88;
console.log(assignObj1.b.c); // Output: 88 (nested object is modified)

/*******************************************************************************
 * Deep Copy
 *
 * A deep copy of an object is a copy whose properties do not share the same
 * references as those of the source object.
 *******************************************************************************/
console.log("================================== Deep Copy ==================================");

// structuredClone() is a modern way to create a deep copy of an object.
console.log("---------- structuredClone() ----------");
const structuredCloneObj1 = { a: 1, b: { c: 2 } };
const structuredCloneObj2 = structuredClone(structuredCloneObj1);
structuredCloneObj2.b.c = 77;
console.log(structuredCloneObj1.b.c); // Output: 2 (original object is not modified)

// JSON.parse(JSON.stringify()) is another way to create a deep copy.
// However, it has limitations (e.g., it can't copy functions, undefined, or Symbols).
console.log("---------- JSON.parse(JSON.stringify()) ----------");
const jsonObj1 = { a: 1, b: { c: 55 } };
const jsonObj2 = JSON.parse(JSON.stringify(jsonObj1));
jsonObj2.b.c = 66;
console.log(jsonObj1.b.c); // Output: 55 (original object is not modified)