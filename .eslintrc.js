module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended', 
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },  
  rules: {
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "object-curly-newline": "off",
    "object-property-newline": "off"
  }
}