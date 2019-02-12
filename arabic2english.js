const dictionary = require('./dictionary');

const BOUND_LOWER = 0;
const BOUND_UPPER = 1000;

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
    const tens = dictionary.tens[Math.floor(num / 10) % 10];
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
}

function processCommandLine() {
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (isNaN(arg)) {
      process.stderr.write(`Invalid input: '${arg}'\n`);
    } else {
      try {
        process.stdout.write(m.number2English(Number(arg)) + '\n');
      } catch (e) {
        process.stderr.write(`Error: ${e} ('${arg}')\n`);
      }
    }
  }
}

const m = (module.exports = {
  number2English,
  processCommandLine,
});

if (require.main === module) {
  processCommandLine();
}
