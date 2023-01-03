import { type OpenAIOptions } from './OpenAIOptions.js';
import { openAICompletion } from './openAICompletion.js';

/**
 *
 * @param requestBody  - the request body to send to the OpenAI API
 * @param chunk - the chunk of text to summarize
 * @param apiKey - the OpenAI API key
 * @returns - the summary
 */
export async function sendChunk(
  requestBody: OpenAIOptions,
  chunk: any,
  apiKey?: string,
) {
  const textToSummarize = chunk.toString() as string;
  requestBody.updatePrompt(textToSummarize);
  return await openAICompletion(requestBody, apiKey);
}
