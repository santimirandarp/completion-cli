import chalk from 'chalk';

import { type OpenAIOptions } from './OpenAIOptions.js';
const openAIURL = new URL('https://api.openai.com/v1/completions');

function createRequest(openAIOptions: OpenAIOptions, apiKey?: string) {
  const jsonApiKey = openAIOptions.apiKey;
  if (!jsonApiKey && !apiKey) {
    console.log(
      chalk.red(
        'Missing apiKey in options. There must be one in cli or in the config file.',
      ),
    );
    process.exit(1);
  }
  return new Request(openAIURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey || jsonApiKey}`,
    },
    body: JSON.stringify(openAIOptions),
  });
}

export async function openAICompletion(
  openAIOptions: OpenAIOptions,
  apiKey?: string,
) {
  const payload = openAIOptions;
  try {
    const request = createRequest(payload, apiKey);
    const response = await fetch(request);
    if (response.ok) {
      const data = await response.json();
      return data.choices[0].text as string;
    } else {
      throw new Error(`${response.statusText}. statusCode: ${response.status}`);
    }
  } catch (error) {
    console.log(chalk.red(`Something went wrong. ${error}`));
    process.exit(1);
  }
}
