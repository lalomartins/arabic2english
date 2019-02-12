//jest.mock('./arabic2english');
const bignum = require('bignumber.js');
const program = require('./arabic2english');
const n = program.n;

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
    expect(n2eSpy).toBeCalledWith(n`1`);
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
    expect(program.number2English(n`0`)).toBe('zero');
  });

  test('converts single-digit numbers', () => {
    expect(program.number2English(n`1`)).toBe('one');
    expect(program.number2English(n`2`)).toBe('two');
    expect(program.number2English(n`3`)).toBe('three');
    expect(program.number2English(n`4`)).toBe('four');
    expect(program.number2English(n`5`)).toBe('five');
    expect(program.number2English(n`6`)).toBe('six');
    expect(program.number2English(n`7`)).toBe('seven');
    expect(program.number2English(n`8`)).toBe('eight');
    expect(program.number2English(n`9`)).toBe('nine');
  });

  test('throws if out of bonds', () => {
    expect(() => program.number2English(bignum(10).pow(75))).toThrow('Input out of bounds');
    expect(() => program.number2English(n`-1`)).toThrow('Input out of bounds');
  });

  test('converts double-digit numbers', () => {
    expect(program.number2English(n`10`)).toBe('ten');
    expect(program.number2English(n`11`)).toBe('eleven');
    expect(program.number2English(n`12`)).toBe('twelve');
    expect(program.number2English(n`13`)).toBe('thirteen');
    expect(program.number2English(n`17`)).toBe('seventeen');
    expect(program.number2English(n`23`)).toBe('twenty-three');
    expect(program.number2English(n`50`)).toBe('fifty');
    expect(program.number2English(n`75`)).toBe('seventy-five');
    expect(program.number2English(n`99`)).toBe('ninety-nine');
  });

  test('converts triple-digit numbers', () => {
    expect(program.number2English(n`100`)).toBe('one hundred');
    expect(program.number2English(n`123`)).toBe('one hundred twenty-three');
    expect(program.number2English(n`203`)).toBe('two hundred and three');
    expect(program.number2English(n`500`)).toBe('five hundred');
    expect(program.number2English(n`717`)).toBe('seven hundred and seventeen');
    expect(program.number2English(n`750`)).toBe('seven hundred and fifty');
  });

  test('converts numbers with thousands', () => {
    expect(program.number2English(n`1,000`)).toBe('one thousand');
    expect(program.number2English(n`5,023`)).toBe('five thousand and twenty-three');
    expect(program.number2English(n`20,030`)).toBe('twenty thousand and thirty');
    expect(program.number2English(n`50,230`)).toBe('fifty thousand, two hundred and thirty');
    expect(program.number2English(n`170,175`)).toBe('one hundred and seventy thousand, one hundred seventy-five');
  });

  test('converts huge numbers', () => {
    // generated random numbers with a script,
    // convert with https://www.calculatorsoup.com/calculators/conversions/numberstowords.php,
    // adjust for our style
    expect(program.number2English(n`1,000,000,000`)).toBe('one billion');
    expect(program.number2English(n`31,633,480,835,797,064,636,738,568,192`)).toBe('thirty-one octillion, six hundred thirty-three septillion, four hundred and eighty sextillion, eight hundred thirty-five quintillion, seven hundred ninety-seven quadrillion, sixty-four trillion, six hundred thirty-six billion, seven hundred thirty-eight million, five hundred sixty-eight thousand, one hundred ninety-two');
    expect(program.number2English(n`952,222,400,205,342,968,005,877,367,354,498,122,223,452,668,204,152,782,848`)).toBe('nine hundred fifty-two septendecillion, two hundred twenty-two sexdecillion, four hundred quindecillion, two hundred and five quattuordecillion, three hundred forty-two tredecillion, nine hundred sixty-eight duodecillion, five undecillion, eight hundred seventy-seven decillion, three hundred sixty-seven nonillion, three hundred fifty-four octillion, four hundred ninety-eight septillion, one hundred twenty-two sextillion, two hundred twenty-three quintillion, four hundred fifty-two quadrillion, six hundred sixty-eight trillion, two hundred and four billion, one hundred fifty-two million, seven hundred eighty-two thousand, eight hundred forty-eight');
    expect(program.number2English(n`7,889,921,769,705,763,457,906,471,773,792,204,167,688,749,056`)).toBe('seven quattuordecillion, eight hundred eighty-nine tredecillion, nine hundred twenty-one duodecillion, seven hundred sixty-nine undecillion, seven hundred and five decillion, seven hundred sixty-three nonillion, four hundred fifty-seven octillion, nine hundred and six septillion, four hundred seventy-one sextillion, seven hundred seventy-three quintillion, seven hundred ninety-two quadrillion, two hundred and four trillion, one hundred sixty-seven billion, six hundred eighty-eight million, seven hundred forty-nine thousand and fifty-six');
    expect(program.number2English(n`574,511,550,525,090,418,809,077,948,050,569,577,164,479,397,888`)).toBe('five hundred seventy-four quattuordecillion, five hundred and eleven tredecillion, five hundred and fifty duodecillion, five hundred twenty-five undecillion, ninety decillion, four hundred and eighteen nonillion, eight hundred and nine octillion, seventy-seven septillion, nine hundred forty-eight sextillion, fifty quintillion, five hundred sixty-nine quadrillion, five hundred seventy-seven trillion, one hundred sixty-four billion, four hundred seventy-nine million, three hundred ninety-seven thousand, eight hundred eighty-eight');
    expect(program.number2English(n`5,379,063,027,219,746,767,084,411,761,939,801,466,537,860,309,538,507,164,781,379,584`)).toBe('five vigintillion, three hundred seventy-nine novemdecillion, sixty-three octodecillion, twenty-seven septendecillion, two hundred and nineteen sexdecillion, seven hundred forty-six quindecillion, seven hundred sixty-seven quattuordecillion, eighty-four tredecillion, four hundred and eleven duodecillion, seven hundred sixty-one undecillion, nine hundred thirty-nine decillion, eight hundred and one nonillion, four hundred sixty-six octillion, five hundred thirty-seven septillion, eight hundred and sixty sextillion, three hundred and nine quintillion, five hundred thirty-eight quadrillion, five hundred and seven trillion, one hundred sixty-four billion, seven hundred eighty-one million, three hundred seventy-nine thousand, five hundred eighty-four');
    expect(program.number2English(n`2,178,970,809`)).toBe('two billion, one hundred seventy-eight million, nine hundred and seventy thousand, eight hundred and nine');
    expect(program.number2English(n`3,909,655,979,275,330,256,896`)).toBe('three sextillion, nine hundred and nine quintillion, six hundred fifty-five quadrillion, nine hundred seventy-nine trillion, two hundred seventy-five billion, three hundred and thirty million, two hundred fifty-six thousand, eight hundred ninety-six');
  });
});
