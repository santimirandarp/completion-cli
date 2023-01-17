#!/usr/bin/env node
/* eslint-disable camelcase */
import { createReadStream } from 'node:fs';

import { compile } from 'html-to-text';

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
  const { filePath, prompt, verbose } = cliOptions;
  const completions: string[] = [];
  /* Also checks for missing & inconsistent arguments */
  const requestBody = new OpenAIOptions(cliOptions);

  if (prompt) {
    overPromptLimitErrors(prompt);
    if (verbose) log('Preparing prompt: ', prompt);
    const completion = await openAICompletion(requestBody);
    completions.push(completion);
    if (verbose) log("response received from OpenAI's API");
  } else if (filePath) {
    const convert = compile({ wordwrap: 130 });

    const stream = createReadStream(filePath, {
      // we need to add an option for this setting
      highWaterMark: 4000,
    });

    for await (let chunk of stream) {
      chunk = chunk.toString() as string;
      if (filePath.endsWith('.html')) {
        chunk = convert(chunk);
      }
      if (verbose) log('Sending chunk to OpenAI');
      const completion = await sendChunk(requestBody, chunk);
      completions.push(completion);
      if (verbose) log("response received from OpenAI's API");
    }
  }
  const result = completions.join('\n');
  log(result);
  return result;
}

getOpenAICompletion();
