import overPromptLimitErrors from '../overPromptLimitErrors.js';
test('Throws an error when over the prompt limit', () => {
  const prompt = 'a'.repeat(15001);
  expect(() => overPromptLimitErrors(prompt)).toThrowError();
});
