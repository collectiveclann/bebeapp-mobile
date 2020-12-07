module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react', '@react-native-community'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
    es2020: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    'react-native/no-inline-styles': 'off',
  },
  plugins: ['babel', 'react', 'import', 'prettier'],
};
