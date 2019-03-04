module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'off',
  },
}
