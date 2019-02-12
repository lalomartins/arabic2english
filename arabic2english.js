const BOUND_LOWER = 0;
const BOUND_UPPER = 10;

function number2English(num) {
  if (num >= BOUND_UPPER || num < BOUND_LOWER) {
    throw('Input out of bounds');
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
