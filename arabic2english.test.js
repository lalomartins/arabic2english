//jest.mock('./arabic2english');
const program = require('./arabic2english');

describe('Correct command line', () => {
  const n2eSpy = jest.spyOn(program, 'number2English');

  let realArgv;
  beforeAll(() => {
    realArgv = process.argv;
    process.argv = ['node', 'testing', '1'];
  });
  afterAll(() => {
    process.argv = realArgv;
    n2eSpy.mockRestore();
  });

  test('Processes command line', () => {
    program.processCommandLine();
    expect(n2eSpy).toBeCalledWith(1);
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

  test('Processes command line', () => {
    program.processCommandLine();
    expect(n2eSpy).not.toBeCalled();
    expect(errMock).toBeCalledWith("Invalid input: 'foo'\n");
  });
});
