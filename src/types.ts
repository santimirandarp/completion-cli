/**
 * Not all the OpenAI API options are available here and some are our custom options.
 * The OpenAI options in the JSON file follow the same syntax than the link below,
 * they should not be camel-cased.
 * @see https://beta.openai.com/docs/api-reference/completions/create
 * The supported options are described below, with the defaults as well.
 */
export interface IOpenAIOptions {
  /**
   * ID of the model to use.
   * @default text-davinci-003
   */
  model: string;
  /**
   * Use only if you do not want to use the file contents as the prompt.
   * OpenAI will error with too many tokens (depends in the model, but usually 2048)
   * @default: "Explain me the world: "
   */
  prompt?: string;
  /**
   * The suffix that comes after a completion of inserted text.
   * @default null
   */
  suffix: string | null;
  /**
   * Integer
   * The maximum number of tokens to generate in the completion.
   * The token count of your prompt plus max_tokens cannot exceed
   * the model's context length. Most models have a context length
   * of 2048 tokens (except for the newest models, which support 4096).
   * @default 16
   */
  max_tokens: number;
  /**
   * What sampling temperature to use. Higher values means
   * the model will take more risks. Try 0.9 for more creative applications,
   * and 0 (argmax sampling) for ones with a well-defined answer.
   * We generally recommend altering this or top_p but not both.
   * @default: 1
   */
  temperature: number;
  /**
   * An alternative to sampling with temperature, called nucleus sampling,
   * where the model considers the results of the tokens with top_p
   * probability mass. So 0.1 means only the tokens comprising the top 10%
   * probability mass are considered.
   * We generally recommend altering this or temperature but not both.
   * @default 1
   */
  top_p: number;
  /**
   * Echo back the prompt in addition to the completion
   * @default false
   */
  echo: boolean;
  /**
   * Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
   * @default null
   */
  stop: string | string[] | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
   * @default 0
   */
  presence_penalty: number;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
    @default 0
*/
  frequency_penalty: number;
}

/**
 * Extending from the OpenAIOptions interface to add the config file options
 */
export interface JSONConfig extends IOpenAIOptions {
  /**
   * Your Open-generated API key [see](https://beta.openai.com/account/api-keys)
   */
  apiKey: string;
  /**
   * **Only use if do not use the prompt**
   * The text to insert before the query contents. (the file split into chunks)
   * @default ""
   */
  prePromptString: string;
  /**
   * **Only use if do not use the prompt**
   * The text to insert after the query contents (the file split into chunks)
   * @default ""
   */
  postPromptString: string;
}
