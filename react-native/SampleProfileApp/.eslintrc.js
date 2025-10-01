module.exports = {
  root: true,
  extends: [
    '@react-native',            // React Native base rules
    'eslint:recommended',       // Core JS rules
    'plugin:react/recommended', // React-specific rules
  ],
  plugins: ['react'],
  parser: '@babel/eslint-parser', // ✅ Use Babel parser
  parserOptions: {
    requireConfigFile: false,    // ✅ Avoids "No Babel config file" error
    babelOptions: {
      // ✅ use require.resolve instead of string
      presets: [require.resolve('@react-native/babel-preset')],
    },
  },
  rules: {
    'array-callback-return': 'warn',  // ⚡ Warn if .map/.filter/.reduce doesn’t return
    'react/prop-types': 'off',        // Optional if not using PropTypes
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
