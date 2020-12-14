module.exports =  {
  parser: '@babel/eslint-parser', 
  extends: [
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off",
  },
};