import singleTextInputOrError from '../singleTextInputOrError.js';

describe('singleTextInputOrError', () => {
  test('no textual input', () => {
    expect(() => singleTextInputOrError({}, {})).toThrowError();
  });
  test('two textual inputs', () => {
    expect(() =>
      singleTextInputOrError({ filePath: 'a', prompt: 'b' }, {}),
    ).toThrowError();
  });
});
