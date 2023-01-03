import meow from 'meow';
export const cliOptions = meow(
  `
  Options
    - --apiKey or -k, expects your openai api key, generated at [openai official site](https://beta.openai.com/). **Example**: explainer -k this5436is546thekey25
    - --filePath or -f, the relative path to the text file. **Example**: explainer -f ./path/to/blogpost.txt
    - --jsonConfig or -j, path to a json file with any of the [Open AI Supported Options](#supported-options). **Example**: explainer -j ./path/to/config.json
    - --url or -u: **not implemented yet.**

    The CLI only supports a small subset of [OpenAI options](https://beta.openai.com/docs/api-reference/completions/create)

    - --prompt or -p: one way to pass text. **Example**: explainer -p Explain me the world: 
    - --model or -m, the default model used is _text-davinci-003_. Other flavours are: _text-curie-001_, _text-babbage-001_. Default text-davinci-003
    - --tokens or -t the expected response length in tokens (max is 4096, about 1700 english words.)
    - --temperature or -T (capital **T**). How creative the model is. Float between 0 and 1. Default 0.
    - --stop or -s. A string or string array with sequences that when found in the text, tell the API to stop generating tokens.
    - --help or -h, show this help message

  Examples
    $ explainer -k this5436is546thekey25 -f ./path/to/blogpost.txt
    $ explainer -k this5436is546thekey25 -j ./path/to/config.json -f ./path/to/blogpost.txt
    $ explainer -k this5436is546thekey25 -t 2000 -T 1 -p Explain me the world:
  `,
  {
    importMeta: import.meta,
    flags: {
      apiKey: {
        type: 'string',
        alias: 'k',
      },
      prompt: {
        type: 'string',
        alias: 'p',
      },
      filePath: {
        type: 'string',
        alias: 'f',
      },
      jsonConfig: {
        type: 'string',
        alias: 'j',
      },
      url: {
        type: 'string',
        alias: 'u',
      },
      model: {
        type: 'string',
        alias: 'm',
      },
      tokens: {
        type: 'number',
        alias: 't',
      },
      temperature: {
        type: 'number',
        alias: 'T',
      },
      echo: {
        type: 'boolean',
        alias: 'e',
      },
    },
  },
).flags;

export type CliOptions = typeof cliOptions;
