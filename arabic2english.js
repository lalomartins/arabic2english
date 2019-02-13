const bignum = require('bignumber.js');

const dictionary = require('./dictionary');

const BOUND_UPPER = bignum(10).pow(66);
const BOUND_LOWER = BOUND_UPPER.negated();

const n = (strings) => bignum(strings[0].replace(/[\s,_]/g, ''));

function number2English(num) {
  if (typeof num === 'number') {
    num = bignum(num);
  }
  if (num.gte(BOUND_UPPER) || num.lte(BOUND_LOWER)) {
    throw 'Input out of bounds';
  }
  if (num < 0) {
    return 'minus ' + number2English(num.negated());
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
      return `${tens}-${number2English(num.mod(10))}`;
    }
  }
  if (num < 1000) {
    const hundreds = `${number2English(num.idiv(100))} hundred`;
    if (num % 100 === 0) {
      return hundreds;
    } else if (num % 100 < 20 || num % 10 === 0) {
      return `${hundreds} and ${number2English(num.mod(100))}`;
    } else {
      return `${hundreds} ${number2English(num.mod(100))}`;
    }
  }
  if (num < 1000000) {
    const thousands = `${number2English(num.idiv(1000))} thousand`;
    if (num % 1000 === 0) {
      return thousands;
    } else if (num % 1000 < 100 || num % 100 === 0) {
      return `${thousands} and ${number2English(num.mod(1000))}`;
    } else {
      return `${thousands}, ${number2English(num.mod(1000))}`;
    }
  }

  // larger numbers
  const scale = Math.floor((num.precision(true) - 1) / 3);
  const accumulated = [];
  let step = scale;
  while (step > 1) {
    const floor = bignum(1000).pow(step);
    const relevant = num.idiv(floor).mod(1000);
    if (relevant !== 0) {
      accumulated.push(`${number2English(relevant)} ${dictionary.powerOfThousand[step]}`);
    }
    if (num % floor === 0) {
      return accumulated.join(', ');
    }
    step -= 1;
  }
  accumulated.push(number2English(num.mod(1000000)));
  return accumulated.join(', ');
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
