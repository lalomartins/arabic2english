const dictionary = require('./dictionary');

const BOUND_LOWER = 0;
const BOUND_UPPER = 100;

function number2English(num) {
  if (num >= BOUND_UPPER || num < BOUND_LOWER) {
    throw('Input out of bounds');
  }
  if (num < 10) {
    return dictionary.singles[num];
  }
  if (num < 20) {
    return dictionary.teens[num - 10];
  }
  if (num < 100) {
    if (num % 10 === 0) {
      return dictionary.tens[Math.floor(num / 10) % 10];
    } else {
      return `${dictionary.tens[Math.floor(num / 10) % 10]}-${number2English(num % 10)}`;
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

const m = module.exports = {
  number2English,
  processCommandLine,
};

if (require.main === module) {
  processCommandLine();
}
