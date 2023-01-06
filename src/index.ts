#!/usr/bin/env node
/* eslint-disable camelcase */
import { createReadStream } from 'node:fs';

import { cliOptions } from './cliOptions.js';
import openAICompletion from './openAICompletion.js';
import OpenAIOptions from './OpenAIOptions.js';
import sendChunk from './sendChunk.js';
import overPromptLimitErrors from './assert/overPromptLimitErrors.js';

/*
 * ---------------------AI COMPLETIONS---------------------
 */

async function getOpenAICompletion() {
  const log = console.log;
  const { filePath, prompt } = cliOptions;
  const completions: string[] = [];
  /* Also checks for missing & inconsistent arguments */
  const requestBody = new OpenAIOptions(cliOptions);

  if (prompt) {
    overPromptLimitErrors(prompt);
    const completion = await openAICompletion(requestBody);
    completions.push(completion);
  } else if (filePath) {
    const stream = createReadStream(filePath, {
      // we need to add an option for this setting
      highWaterMark: 15000,
    });

    log('The filepath is: ', stream.path);

    for await (const chunk of stream) {
      const completion = await sendChunk(requestBody, chunk);
      completions.push(completion);
    }
  }
  const result = completions.join('');
  log(result);
  return result;
}

getOpenAICompletion().catch((e) => console.log(e));
