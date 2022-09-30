module.exports = {
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "semicolon": false,
  "singleQuote": true,
  "printWidth": 90,
  "wrapAttributes": true,
  "htmlWhitespaceSensitivity": "ignore",
  "arrowParens": "avoid",
  "plugins": [require('prettier-plugin-tailwindcss')],
  "tailwindConfig": './tailwind.config.cjs',
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    }
  ]
}