module.exports = {
  tabWidth: 2,
  jsxDoubleQuote: true,
  jsxBracketSameLine: true,
  printWidth: 100,
  doubleQuote: true,
  semi: false,
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: "always",
};
