import { readFileSync } from 'fs';

import type { CliOptions } from './cliOptions.js';
import type { IOpenAIOptions, JSONConfig } from './types.js';
import singleTextInputOrError from './assert/singleTextInputOrError.js';

type InputData = Partial<CliOptions>;
/**
 *
 * @param text - the text to summarize
 * @param configPath - the path to the config file from the cwd (aka relative path)
 * @returns model options
 */
export default class OpenAIOptions implements IOpenAIOptions {
  model: string;
  prompt?: string;
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

  constructor(cli: InputData) {
    /* 
    the rest of properties not destructured because 
    using cli?.propName makes it clear where it comes from. 
    */
    const { jsonConfig: configPath } = cli;

    let json: Partial<JSONConfig> = {};

    if (configPath) {
      json = JSON.parse(readFileSync(configPath, 'utf8'));
    }
    singleTextInputOrError(cli, json);

    this.#apiKey = cli?.apiKey ?? json.apiKey ?? '';
    if (!this.#apiKey) {
      throw new Error(
        'No API key was found. Please provide one with the --apiKey flag or in the config file.',
      );
    }

    this.#preQ = json.prePromptString ?? '';
    this.#postQ = json.postPromptString ?? '';
    this.model = cli?.model || json.model || 'text-davinci-003';
    // if this is undefined before sending, make it "Explain me the world: "
    this.prompt = this.makeFirstPrompt(cli?.prompt ?? json?.prompt);
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
  private makeFirstPrompt(text: string | undefined) {
    if (typeof text !== 'string') return;
    return this.#preQ + text + this.#postQ;
  }
}
