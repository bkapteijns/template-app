module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["plugin:react/recommended", "airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    quotes: ["warn", "double", { allowTemplateLiterals: true }],
    "comma-dangle": ["warn", "never"],
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "no-underscore-dangle": 0,
    "operator-linebreak": 0,
    "react/forbid-prop-types": 0,
    "implicit-arrow-linebreak": 0
  }
};
