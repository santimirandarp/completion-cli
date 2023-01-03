/* eslint-disable camelcase */
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

import chalk from 'chalk';

import { cliOptions } from './cliOptions.js';
import { openAICompletion } from './openAICompletion.js';
import { OpenAIOptions } from './OpenAIOptions.js';
import { sendChunk } from './sendChunk.js';

/*
 * ---------------------AI COMPLETIONS---------------------
 */

/**
 * The main function
 * Alerts of any missing arguments and exits
 */
async function getOpenAICompletion() {
  const { apiKey, url, filePath, jsonConfig, prompt } = cliOptions;
  const log = console.log;

  const summaries: string[] = [];

  /* we need the api key to make the request */
  if (!apiKey) {
    if (typeof jsonConfig === 'undefined') {
      log(
        chalk.red(
          `Missing --apiKey in cli options.  There must be one or in the config file.`,
        ),
      );
      process.exit(1);
    }
  }
  /* A text input must exist. */
  if (!url && !filePath && !prompt && !jsonConfig) {
    log(
      chalk.red(
        'Missing prompt, expected --prompt <text> or --filePath <path> or --jsonConfig <path>',
      ),
    );
    process.exit(1);
  }

  /* Do not allow multiple text input methods */
  if ((url && filePath) || (url && prompt) || (filePath && prompt)) {
    log(chalk.red('Only one of --url, --filePath, or --prompt is allowed'));
    process.exit(1);
  }

  // The fetch request body. Non-enumerable fields are ignored when stringified
  const requestBody = new OpenAIOptions({
    configPath: jsonConfig,
    cli: cliOptions,
  });

  // if json.prompt and prompt, this will overwrite the json.prompt
  if (prompt) {
    const summary = await openAICompletion(requestBody, apiKey);
    summaries.push(summary);
  } else if (filePath) {
    const dataFileFullPath = join(process.cwd(), filePath);

    const stream = createReadStream(dataFileFullPath, {
      // expected as very close to number of bytes (for ascii)
      highWaterMark: 7500,
    });

    log(chalk.green('the data filepath is: ', stream.path));

    for await (const chunk of stream) {
      const summary = await sendChunk(requestBody, chunk, apiKey);
      summaries.push(summary);
    }
  }
  const result = summaries.join('');
  log(result);
  return result;
}

getOpenAICompletion().catch((e) => console.log(chalk.red(e)));
