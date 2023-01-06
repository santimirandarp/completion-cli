import type OpenAIOptions from './OpenAIOptions.js';
const openAIURL = new URL('https://api.openai.com/v1/completions');

function createRequest(openAIOptions: OpenAIOptions) {
  const apiKey = openAIOptions.apiKey;
  return new Request(openAIURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(openAIOptions),
  });
}

export default async function (openAIOptions: OpenAIOptions) {
  const payload = openAIOptions;
  try {
    const request = createRequest(payload);
    const response = await fetch(request);
    if (response.ok) {
      const data = await response.json();
      return data.choices[0].text as string;
    } else {
      throw new Error(`${response.statusText}. statusCode: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
}
