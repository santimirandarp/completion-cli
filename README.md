# completion-cli

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

`completion-cli` is a NodeJS command-line tool to complete text or text files. It uses the OpenAI completions endpoint.

In this context, _completion_ means summarize, continue the "flow", explaining text, etc.

This cli tool was done for personal use, but feel free to use it.

## Requirements

- **NodeJS Version**: You need [**NodeJS v19+**](https://nodejs.org/en/download/current/) to run it, because the new Node v19 API `fetch` is used to query the server.

## Security

- The `apiKey` is only known to you and the OpenAI servers.

## Installation

`npx completion-cli --help`

will give you the options.

It is also possible to download and run it if you have `ts-node`, using `--esm` option:

```shell
ts-node --esm src/index.ts --filePath ../input.txt -k ${OPENAI_API_KEY} -j config.json -t 150
```
## Usage Examples

<details>

<summary> See Usage Examples </summary>

- Send the text from `blogpost.txt` using supported option in the config file.

I tend to use this option almost exclusively.

```shell
npx completion-cli -k this5436is546thekey25 -j ./path/to/config.json -f ./path/to/blogpost.txt
```

Example of a [json config here](./test/jsonConfig.json)

- Creative reply, 2000 tokens long roughly

```shell
npx completion-cli -k this5436is546thekey25 -t 2000 -T 1 -p "Explain me the world:"
```

</details>
<br/>

## Options

Pass either cli flags or a JSON-config path. The CLI and JSON options are combined, CLI overwrites JSON. But only one of `--prompt` or `--filePath` or `json.prompt` is allowed.

<details>
<summary> Cli Supported Options </summary>

- `--help`
- `--apiKey` or `-k`, your openAI api key, generated at [OpenAI Official Site](https://beta.openai.com/). **Example**: `completion-cli -k this5436is546thekey25`
- `--filePath` or `-f`, the relative path to the text file. **Example**: `completion-cli -f ./path/to/blogpost.txt`
- `--jsonConfig` or `-j`, path to a json file with any of the [Open AI Supported Options](#supported-onot both, and any of these overwrites ptions). **Example**: `completion-cli -j ./path/to/config.json`

The CLI only supports a small subset of [OpenAI options][1]

- `--prompt` or `-p`: one way to pass text. **Example**: `completion-cli -p Explain me the world: `. The length limit is 15000 bytes (ascii characters.)
- `--model` or `-m`, the default model used is _text-davinci-003_. Other flavours are: _text-curie-001_, _text-babbage-001_. Default `text-davinci-003`
- `--tokens` or `-t` the expected response length in tokens (max is 4096, about 1700 english words.)`
- `--temperature` or `-T` (capital **T**). How creative the model is. Float between 0 and 1. Default 0.
- `--echo` or `-e`. Explicit `boolean`. Indicates whether to concatenate the response to the prompt or not. You need to specify `--echo [true, false]`

</details>

<details>

<br/>

All the values in the object are optional. For explanations and default values check [the schema file](./OpenAIOptions).

<summary>JSON Options</summary>

```js
{
  "apiKey": string;
  "model": string;
  "prompt": string;
  "suffix": string;
  "max_tokens": number;
  "temperature": number;
  "top_p": number;
  "echo": boolean;
  "stop": string | string[];
  "presence_penalty": number;
  "frequency_penalty": number;
  "prePromptString": string;
  "postPromptString": string;
}
```

</details>

<br/>

## Bugs

The package is new and there will be errors. Please file issues or PRs.

## ToDos

- [ ] Support different text encoding for filePath (streams have option for this)
- [ ] Support a verbose option for extra logs.
- [ ] Improve boolean flags (atm you have to specify `--flagName true/false`).
- [ ] Support multiple completions from json configuration using the option `n`.
- [ ] Support for `stream` option.
- [ ] Support html (cleaning up the tags.). This may be done during stream.
- [ ] Support pdf.
- [ ] Support both from urls as well.

The code is being thought such that it is not too difficult to adapt it to the browser.

## License

[MIT](./LICENSE)

There are no restrictions and you can do with the code what you prefer.

[1]: https://beta.openai.com/docs/api-reference/completions/create
[npm-image]: https://img.shields.io/npm/v/completion-cli.svg
[npm-url]: https://www.npmjs.com/package/completion-cli
[ci-image]: https://github.com/santimirandarp/completion-cli/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/santimirandarp/completion-cli/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/santimirandarp/completion-cli.svg
[codecov-url]: https://codecov.io/gh/santimirandarp/completion-cli
[download-image]: https://img.shields.io/npm/dm/completion-cli.svg
[download-url]: https://www.npmjs.com/package/completion-cli
