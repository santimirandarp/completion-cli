import type OpenAIOptions from './OpenAIOptions.js';
import openAICompletion from './openAICompletion.js';

/**
 *
 * @param requestBody  - the request body to send to the OpenAI API
 * @param chunk - the chunk of text to summarize
 * @param apiKey - the OpenAI API key
 * @returns - the summary
 */
export default async function (requestBody: OpenAIOptions, chunk: any) {
  const textToSummarize = chunk.toString() as string;
  requestBody.updatePrompt(textToSummarize);
  return await openAICompletion(requestBody);
}
