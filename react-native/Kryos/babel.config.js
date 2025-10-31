/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.json'],
        root: ['./src'],
      },
    ],
    'inline-dotenv',
    [
      'module:react-native-dotenv',
      {
        env: [
          'SUPABASE_URL',
          'SUPABASE_ANON_KEY',
        ],
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin', // need to be the last plugin
  ],
  presets: ['module:@react-native/babel-preset'],
};
