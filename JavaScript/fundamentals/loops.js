"use strict";   // https://javascript.info/strict-mode

label: {
  // ...
  another_label: {
     // ...
    break label; // works
  }
}

outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = console.log(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) break outer; // (*)

    // do something with the value...
  }
}

console.log('Done!');


