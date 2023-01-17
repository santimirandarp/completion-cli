import meow from 'meow';
export const cliOptions = meow(
  `
  Options
    - --apiKey or -k, expects your openai api key, generated at [openai official site](https://beta.openai.com/). **Example**: completion-cli -k this5436is546thekey25
    - --filePath or -f, the relative path to the text file. **Example**: completion-cli -f ./path/to/blogpost.txt
    - --jsonConfig or -j, path to a json file with any of the [Open AI Supported Options](#supported-options). **Example**: completion-cli -j ./path/to/config.json
    - --verbose or -v, gives you some feedback as it executes. Default false.

    The CLI only supports a small subset of [OpenAI options](https://beta.openai.com/docs/api-reference/completions/create)

    - --prompt or -p: one way to pass text. **Example**: completion-cli -p Explain me the world: 
    - --model or -m, the default model used is _text-davinci-003_. Other flavours are: _text-curie-001_, _text-babbage-001_. Default text-davinci-003
    - --tokens or -t the expected response length in tokens (max is 4096, about 1700 english words.)
    - --temperature or -T (capital **T**). How creative the model is. Float between 0 and 1. Default 0.
    - --echo or -e. Whether to echo the prompt back with the response. Default false.
    - --help or -h, show this help message

  Examples
    $ completion-cli -k this5436is546thekey25 -j ./path/to/config.json -f ./path/to/blogpost.txt
    $ completion-cli -k this5436is546thekey25 -t 2000 -T 1 -p Explain me the world:
  `,
  {
    importMeta: import.meta,
    flags: {
      apiKey: {
        type: 'string',
        alias: 'k',
      },
      filePath: {
        type: 'string',
        alias: 'f',
      },
      jsonConfig: {
        type: 'string',
        alias: 'j',
      },
      prompt: {
        type: 'string',
        alias: 'p',
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
      verbose: {
        type: 'boolean',
        alias: 'v',
      },
    },
  },
).flags;

export type CliOptions = typeof cliOptions;
