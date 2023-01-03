import { readFileSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

import type { CliOptions } from './cliOptions.js';
import type { IOpenAIOptions, ConfigFileOptions } from './types.js';

export type InputData = {
  //relative to the user cwd()
  configPath?: string;
  //the cli flags parsed by `meow`
  cli?: Partial<CliOptions>;
};
/**
 *
 * @param text - the text to summarize
 * @param configPath - the path to the config file from the cwd (aka relative path)
 * @returns model options
 */
export class OpenAIOptions implements IOpenAIOptions {
  model: string;
  prompt: string;
  suffix: string | null;
  max_tokens: number;
  temperature: number;
  top_p: number;
  echo: boolean;
  stop: string | string[] | null;
  presence_penalty: number;
  frequency_penalty: number;
  #apiKey: string;
  #preQ: string;
  #postQ: string;

  constructor(data: InputData = { cli: {} }) {
    const { configPath, cli } = data;
    let json: Partial<ConfigFileOptions> = {};

    if (configPath) {
      json = JSON.parse(readFileSync(join(process.cwd(), configPath), 'utf8'));
    }
    this.#apiKey = cli?.apiKey || json.apiKey || '';
    if (this.#apiKey === '') {
      console.log(
        chalk.red(
          'No API key was found. Please provide one with the --apiKey flag or in the config file.',
        ),
      );
      process.exit(1);
    }

    this.#preQ = json.prePromptString ?? '';
    this.#postQ = json.postPromptString ?? '';
    this.model = cli?.model || json.model || 'text-davinci-003';
    const input = cli?.prompt ?? (cli?.filePath ? '' : json.prompt || '');
    this.prompt = this.makeFirstPrompt(input);
    this.suffix = json.suffix ?? null;
    this.max_tokens = Math.floor(cli?.tokens ?? json.max_tokens ?? 16);
    this.temperature = Math.floor(cli?.temperature ?? json.temperature ?? 1);
    this.top_p = json.top_p ?? 1;
    this.echo = cli?.echo ?? json.echo ?? false;
    this.stop = json.stop ?? null;
    this.presence_penalty = json.presence_penalty ?? 0;
    this.frequency_penalty = json.frequency_penalty ?? 0;
  }
  public updatePrompt(text: string) {
    this.prompt = this.#preQ + text + this.#postQ;
  }
  get apiKey() {
    // this is so that the api key is not stringified
    return this.#apiKey;
  }
  private makeFirstPrompt(text: string) {
    return this.#preQ + text + this.#postQ;
  }
}
