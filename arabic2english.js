const bignum = require('bignumber.js');

const dictionary = require('./dictionary');

const BOUND_LOWER = 0;
const BOUND_UPPER = Math.pow(10, 66);

const n = (strings) => bignum(strings[0].replace(/[\s,_]/g, ''));

function number2English(num) {
  if (num >= BOUND_UPPER || num < BOUND_LOWER) {
    throw 'Input out of bounds';
  }
  if (num < 10) {
    return dictionary.singles[num];
  }
  if (num < 20) {
    return dictionary.teens[num - 10];
  }
  if (num < 100) {
    const tens = dictionary.tens[Math.floor(num / 10)];
    if (num % 10 === 0) {
      return tens;
    } else {
      return `${tens}-${number2English(num % 10)}`;
    }
  }
  if (num < 1000) {
    const hundreds = `${number2English(Math.floor(num / 100))} hundred`;
    if (num % 100 === 0) {
      return hundreds;
    } else if (num % 100 < 20 || num % 10 === 0) {
      return `${hundreds} and ${number2English(num % 100)}`;
    } else {
      return `${hundreds} ${number2English(num % 100)}`;
    }
  }
  const thousands = `${number2English(Math.floor(num / 1000))} thousand`;
  if (num % 1000 === 0) {
    return thousands;
  } else if (num % 1000 < 100 || num % 100 === 0) {
    return `${thousands} and ${number2English(num % 1000)}`;
  } else {
    return `${thousands}, ${number2English(num % 1000)}`;
  }
}

function processCommandLine() {
  const arg = process.argv.slice(2).join(' ');
  const num = n(arg);
  if (num.isNaN()) {
    process.stderr.write(`Invalid input: '${arg}'\n`);
  } else {
    try {
      process.stdout.write(m.number2English(num) + '\n');
    } catch (e) {
      process.stderr.write(`Error: ${e} ('${arg}')\n`);
    }
  }
}

const m = (module.exports = {
  n,
  number2English,
  processCommandLine,
});

if (require.main === module) {
  processCommandLine();
}
