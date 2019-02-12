# arabic2english

Spell out numbers in English.

## Preparation

Before using, run `npm -i` once.

## Usage

`node arabic2english.js 23`

Or type the number of your preference instead of 23. Spaces, commas, and underscores are ignored; you can use those to format large numbers more clearly.

It can also be used as a library. You can call it with native JS numbers, or bignums from the bignumber.js library. A `n` template tag is provided for convenience, to construct bignums from strings.

```js
const {number2English, n} = require('./arabic2english');

console.log(number2English(23));
console.log(number2English(n`2,178,970,809`));
```

## Testing

The script is tested with [jest](https://jestjs.io/). To run the tests, just do `npm test`.
