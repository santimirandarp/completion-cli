import { join } from 'path';

import OpenAIOptions from '../src/OpenAIOptions.js';

describe('Generate options from flags', () => {
  it('cli options', () => {
    //generate the body from the cli options and default values
    const userInput = {
      apiKey: 'hello',
      prompt: 'How old are you?',
      tokens: 100,
      echo: true,
      temperature: 0,
    };
    const openAIOptions = new OpenAIOptions(userInput);
    const apiKey = openAIOptions.apiKey;
    expect(apiKey).toBe('hello');
    expect({ ...openAIOptions }).toMatchObject({
      model: 'text-davinci-003',
      prompt: 'How old are you?',
      max_tokens: 100,
      temperature: 0,
      echo: true,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 1,
      stop: null,
      suffix: null,
    });
  });
  it("no api key, it's required", () => {
    const userInput = { prompt: 'How old are you?' };
    expect(() => new OpenAIOptions(userInput)).toThrowError(
      'No API key was found.',
    );
  });
  it('update prompt method', () => {
    const userInput = {
      apiKey: 'hello',
      prompt: 'How old are you?',
    };
    const openAIOptions = new OpenAIOptions(userInput);
    openAIOptions.updatePrompt('meow');
    expect(openAIOptions.prompt).toBe('meow');
  });
  it('Generate options from config', () => {
    const openAIOptions = new OpenAIOptions({
      jsonConfig: join(__dirname, './jsonConfig.json'),
    });
    const apiKey = openAIOptions.apiKey;

    expect(apiKey).toBe('YOUR_API_KEY');

    const groundTruth = {
      model: 'text-davinci-003',
      prompt: 'How old are you?',
      max_tokens: 90,
      temperature: 0,
      top_p: 1,
      echo: true,
      presence_penalty: 0,
      frequency_penalty: 0,
    };
    expect({ ...openAIOptions }).toMatchObject(groundTruth);
  });

  it('cli options merged into config file options', () => {
    const inputData = {
      apiKey: 'hello',
      tokens: 110,
      echo: false,
      jsonConfig: join(__dirname, './jsonConfig.json'),
    };
    // cli and json options are combined.
    const expectedData = {
      model: 'text-davinci-003',
      prompt: 'How old are you?',
      max_tokens: 110,
      temperature: 0,
      top_p: 1,
      echo: false,
      presence_penalty: 0,
      frequency_penalty: 0,
    };
    const openAIOptions = new OpenAIOptions(inputData);
    const apiKey = openAIOptions.apiKey;
    expect(apiKey).toBe('hello');
    expect({ ...openAIOptions }).toMatchObject(expectedData);
  });
});
