"use strict"; // https://javascript.info/strict-mode

/*******************************************************************************
 * Loops
 *
 * Loops are used to execute a block of code a number of times.
 *******************************************************************************/
console.log("================================== Loops ==================================");

// Labels can be used to break out of nested loops.
console.log("---------- Labels for Loops ----------");
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(`Value at coords (${i},${j})`); // Output: Value at coords (0,0), (0,1), ...
    if (i === 1 && j === 1) {
      console.log("Breaking out of outer loop from inner loop");
      break outer;
    }
  }
}
console.log('Done!'); // Output: Done!