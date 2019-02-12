function number2English(num) {
  if (num > 9) {
    throw('Input out of bounds');
  }
}

function processCommandLine() {
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (isNaN(arg)) {
      process.stderr.write(`Invalid input: '${arg}'\n`);
    } else {
      process.stdout.write(m.number2English(Number(arg)) + '\n');
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
