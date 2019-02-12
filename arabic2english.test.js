//jest.mock('./arabic2english');
const program = require('./arabic2english');

describe('Correct command line', () => {
  const n2eSpy = jest.spyOn(program, 'number2English');
  const outMock = jest.fn();

  let realArgv;
  beforeAll(() => {
    realArgv = process.argv;
    process.argv = ['node', 'testing', '1'];
    process.stdout.write = outMock;
  });
  afterAll(() => {
    process.argv = realArgv;
    n2eSpy.mockRestore();
    delete process.stdout.write;
  });

  test('processes command line', () => {
    n2eSpy.mockReturnValueOnce('ichi');
    program.processCommandLine();
    expect(n2eSpy).toBeCalledWith(1);
    expect(outMock).toBeCalledWith('ichi\n');
  });
});

describe('Invalid command line', () => {
  const n2eSpy = jest.spyOn(program, 'number2English');
  const errMock = jest.fn();

  let realArgv;
  beforeAll(() => {
    realArgv = process.argv;
    process.argv = ['node', 'testing', 'foo'];
    process.stderr.write = errMock;
  });
  afterAll(() => {
    process.argv = realArgv;
    n2eSpy.mockRestore();
    delete process.stderr.write;
  });

  test('processes command line', () => {
    program.processCommandLine();
    expect(n2eSpy).not.toBeCalled();
    expect(errMock).toBeCalledWith("Invalid input: 'foo'\n");
  });
});

describe('Convert numbers to English', () => {
  test('converts zero', () => {
    expect(program.number2English(0)).toBe('zero');
  });

  test('converts single-digit numbers', () => {
    expect(program.number2English(1)).toBe('one');
    expect(program.number2English(2)).toBe('two');
    expect(program.number2English(3)).toBe('three');
    expect(program.number2English(4)).toBe('four');
    expect(program.number2English(5)).toBe('five');
    expect(program.number2English(6)).toBe('six');
    expect(program.number2English(7)).toBe('seven');
    expect(program.number2English(8)).toBe('eight');
    expect(program.number2English(9)).toBe('nine');
  });

  test('throws if out of bonds', () => {
    expect(() => program.number2English(Math.pow(10, 75))).toThrow('Input out of bounds');
    expect(() => program.number2English(-1)).toThrow('Input out of bounds');
  });

  test('converts double-digit numbers', () => {
    expect(program.number2English(10)).toBe('ten');
    expect(program.number2English(11)).toBe('eleven');
    expect(program.number2English(12)).toBe('twelve');
    expect(program.number2English(13)).toBe('thirteen');
    expect(program.number2English(17)).toBe('seventeen');
    expect(program.number2English(23)).toBe('twenty-three');
    expect(program.number2English(50)).toBe('fifty');
    expect(program.number2English(75)).toBe('seventy-five');
    expect(program.number2English(99)).toBe('ninety-nine');
  });

  test('converts triple-digit numbers', () => {
    expect(program.number2English(100)).toBe('one hundred');
    expect(program.number2English(123)).toBe('one hundred twenty-three');
    expect(program.number2English(203)).toBe('two hundred and three');
    expect(program.number2English(500)).toBe('five hundred');
    expect(program.number2English(717)).toBe('seven hundred and seventeen');
    expect(program.number2English(750)).toBe('seven hundred and fifty');
  });

  test('converts numbers with thousands', () => {
    expect(program.number2English(1000)).toBe('one thousand');
    expect(program.number2English(5023)).toBe('five thousand and twenty-three');
    expect(program.number2English(20030)).toBe('twenty thousand and thirty');
    expect(program.number2English(50230)).toBe('fifty thousand, two hundred and thirty');
    expect(program.number2English(170175)).toBe('one hundred and seventy thousand, one hundred seventy-five');
  });

  test('converts huge numbers', () => {
    // generated random numbers with a script,
    // convert with https://www.calculatorsoup.com/calculators/conversions/numberstowords.php,
    // adjust for our style
    expect(program.number2English(1000000000)).toBe('one billion');
    expect(program.number2English(31633480835797064636738568192)).toBe('thirty-one octillion, six hundred thirty-three septillion, four hundred and eighty sextillion, eight hundred thirty-five quintillion, seven hundred ninety-seven quadrillion, sixty-four trillion, six hundred thirty-six billion, seven hundred thirty-eight million, five hundred sixty-eight thousand, one hundred ninety-two');
    expect(program.number2English(952222400205342968005877367354498122223452668204152782848)).toBe('nine hundred fifty-two septendecillion, two hundred twenty-two sexdecillion, four hundred quindecillion, two hundred and five quattuordecillion, three hundred forty-two tredecillion, nine hundred sixty-eight duodecillion, five undecillion, eight hundred seventy-seven decillion, three hundred sixty-seven nonillion, three hundred fifty-four octillion, four hundred ninety-eight septillion, one hundred twenty-two sextillion, two hundred twenty-three quintillion, four hundred fifty-two quadrillion, six hundred sixty-eight trillion, two hundred and four billion, one hundred fifty-two million, seven hundred eighty-two thousand, eight hundred forty-eight');
    expect(program.number2English(7889921769705763457906471773792204167688749056)).toBe('seven quattuordecillion, eight hundred eighty-nine tredecillion, nine hundred twenty-one duodecillion, seven hundred sixty-nine undecillion, seven hundred and five decillion, seven hundred sixty-three nonillion, four hundred fifty-seven octillion, nine hundred and six septillion, four hundred seventy-one sextillion, seven hundred seventy-three quintillion, seven hundred ninety-two quadrillion, two hundred and four trillion, one hundred sixty-seven billion, six hundred eighty-eight million, seven hundred forty-nine thousand, fifty-six');
    expect(program.number2English(574511550525090418809077948050569577164479397888)).toBe('five hundred seventy-four quattuordecillion, five hundred and eleven tredecillion, five hundred and fifty duodecillion, five hundred twenty-five undecillion, ninety decillion, four hundred and eighteen nonillion, eight hundred and nine octillion, seventy-seven septillion, nine hundred forty-eight sextillion, fifty quintillion, five hundred sixty-nine quadrillion, five hundred seventy-seven trillion, one hundred sixty-four billion, four hundred seventy-nine million, three hundred ninety-seven thousand, eight hundred eighty-eight');
    expect(program.number2English(5379063027219746767084411761939801466537860309538507164781379584)).toBe('five vigintillion, three hundred seventy-nine novemdecillion, sixty-three octodecillion, twenty-seven septendecillion, two hundred and nineteen sexdecillion, seven hundred forty-six quindecillion, seven hundred sixty-seven quattuordecillion, eighty-four tredecillion, four hundred and eleven duodecillion, seven hundred sixty-one undecillion, nine hundred thirty-nine decillion, eight hundred and one nonillion, four hundred sixty-six octillion, five hundred thirty-seven septillion, eight hundred sixty sextillion, three hundred and nine quintillion, five hundred thirty-eight quadrillion, five hundred and seven trillion, one hundred sixty-four billion, seven hundred eighty-one million, three hundred seventy-nine thousand, five hundred eighty-four');
    expect(program.number2English(2178970809)).toBe('two billion, one hundred seventy-eight million, nine hundred seventy thousand, eight hundred and nine');
    expect(program.number2English(3909655979275330256896)).toBe('three sextillion, nine hundred and nine quintillion, six hundred fifty-five quadrillion, nine hundred seventy-nine trillion, two hundred seventy-five billion, three hundred and thirty million, two hundred fifty-six thousand, eight hundred ninety-six');
  });
});
