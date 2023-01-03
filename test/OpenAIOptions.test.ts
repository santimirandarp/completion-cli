import { join } from 'path';
import { describe, it, expect } from 'vitest';

import { OpenAIOptions, type InputData } from '../src/OpenAIOptions';

describe('Generate options from flags', () => {
  it('cli options', () => {
    //generate the body from the cli options and default values
    const openAIOptions = new OpenAIOptions({
      cli: {
        apiKey: 'hello',
        prompt: 'How old are you?',
        tokens: 100,
        echo: true,
        temperature: 0,
      },
    });

    const apiKey = openAIOptions.apiKey;
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
    expect(apiKey).toBe('hello');
  });

  it('Generate options from config', () => {
    const openAIOptions = new OpenAIOptions({
      configPath: join(__dirname, './jsonConfig.json'),
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
      cli: {
        apiKey: 'hello',
        prompt: 'tall are',
        tokens: 110,
        echo: false,
      },
      configPath: join(__dirname, './jsonConfig.json'),
    };
    // cli and json options are combined.
    const expectedData = {
      model: 'text-davinci-003',
      prompt: 'How tall are you?',
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
  });

  it.skip('Make prompt from filePath', () => {});
});
