# Today I Learned (TiL)

This repository is a collection of my daily learnings in JavaScript and React Native. It serves as a personal knowledge base and a quick reference for concepts I've explored.

## 🚀 Getting Started

To get started, you can clone this repository and explore the code. The `javascript` directory contains fundamental concepts, and the `react-native` directory will house my React Native learnings.

### File Organization

The files in this repository have been organized to provide a clear and structured learning path. Here is the current structure:

```
/
├── LICENSE
├── README.md
├── javascript/
│   ├── index.html
│   └── src/
│       └── 01-fundamentals/
│           ├── 01-variables.js
│           ├── 02-data-types.js
│           └── ...
└── react-native/
```

To apply this new structure, you can run the following script in your terminal:

```bash
# Create the new directory structure
mkdir -p javascript/src/01-fundamentals

# Move the JavaScript files
mv JavaScript/fundamentals/*.js javascript/src/01-fundamentals/

# Move the index.html file
mv JavaScript/index.html javascript/

# Remove the old JavaScript directory
rm -rf JavaScript

# Rename the files with numeric prefixes
cd javascript/src/01-fundamentals
mv variables.js 01-variables.js
mv data-types.js 02-data-types.js
mv conversions.js 03-conversions.js
mv comparison.js 04-comparison.js
mv conditionals-and-logical_operators.js 05-conditionals-and-logical_operators.js
mv loops.js 06-loops.js
mv functions.js 07-functions.js
mv hoisting.js 08-hoisting.js
mv basics.js 09-basics.js
mv interaction.js 10-interaction.js
mv copying.js 11-copying.js
cd ../../..

# Rename the ReactNative directory
mv ReactNative react-native
```

## 📖 JavaScript Fundamentals

The `javascript/src/01-fundamentals` directory covers the following topics:

*   **01-variables.js**: Declaring variables using `let`, `var`, and `const`.
*   **02-data-types.js**: JavaScript's 8 data types.
*   **03-conversions.js**: Type conversion (casting).
*   **04-comparison.js**: Comparison operators (`==` vs `===`).
*   **05-conditionals-and-logical_operators.js**: Conditional and logical operators.
*   **06-loops.js**: `for` and `while` loops.
*   **07-functions.js**: Function declarations and arrow functions.
*   **08-hoisting.js**: Understanding hoisting in JavaScript.
*   **09-basics.js**: Basic syntax and semicolons.
*   **10-interaction.js**: Interacting with the user (`alert`, `prompt`, `confirm`).
*   **11-copying.js**: Shallow vs. deep copying of objects.

Each file contains code examples with detailed comments explaining the concepts.

## Contributing

Since this is a personal learning repository, I am not accepting contributions at this time. However, feel free to fork the repository and use it for your own learning.
