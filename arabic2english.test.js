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
    expect(() => program.number2English(10)).toThrow('Input out of bounds');
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
});
