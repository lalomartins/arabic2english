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
