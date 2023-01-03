# explainer-cli

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

`explainer-cli` is NodeJS CLI tool for explaining or summarizing text or text files.

## Requirements

- **NodeJS Version**: You need [**NodeJS v19+**](https://nodejs.org/en/download/current/) to run it, because the new Node v19 API `fetch` is used to query the server.

- Endpoint: OpenAI `https://api.openai.com/v1/completions` endpoint.

## Security

- The `apiKey` is only known to you and the OpenAI servers.

## Installation

`npx explainer-cli <options>`

You can also use standard `npm i explainer-cli`. And then execute the script.

## Usage Examples

<details>

<summary> See Usage Examples </summary>

- summarize a blogpost (clean text file):

```shell
 explainer-cli -k this5436is546thekey25 -f ./path/to/blogpost.txt
```

- Create a prompt using the blogpost text and any supported option in the config file.

```shell
 explainer-cli -k this5436is546thekey25 -j ./path/to/config.json -f ./path/to/blogpost.txt
```

If no `prePromptString` and no `postPromptString` the text will be summarized (default). Otherwise those will encapsulate (i.e surround) the prompt/text.

- send a simple prompt, asking for a creative reply, and about 2000 tokens long

```shell
 explainer-cli -k this5436is546thekey25 -t 2000 -T 1 -p Explain me the world:
```

</details>
<br/>

## Options

Pass either CLI flags or a JSON config path. The CLI and JSON options are combined, CLI overwrites JSON. For the text inputs you can only pass `--prompt` or `--filePath` not both, and any of these overwrites `json.prompt`

<details>
<summary> Cli Supported Options </summary>

- `--help` or `-h`, shows all options.
- `--apiKey` or `-k`, expects your openai api key, generated at [OpenAI Official Site](https://beta.openai.com/). **Example**: `explainer-cli -k this5436is546thekey25`
- `--filePath` or `-f`, the relative path to the text file. **Example**: `explainer-cli -f ./path/to/blogpost.txt`
- `--jsonConfig` or `-j`, path to a json file with any of the [Open AI Supported Options](#supported-options). **Example**: `explainer-cli -j ./path/to/config.json`
- `--url` or `-u`: **not implemented yet.**

The CLI only supports a small subset of [OpenAI options][1]

- `--prompt` or `-p`: one way to pass text. **Example**: `explainer-cli -p Explain me the world: `
- `--model` or `-m`, the default model used is _text-davinci-003_. Other flavours are: _text-curie-001_, _text-babbage-001_. Default `text-davinci-003`
- `--tokens` or `-t` the expected response length in tokens (max is 4096, about 1700 english words.)`
- `--temperature` or `-T` (capital **T**). How creative the model is. Float between 0 and 1. Default 0.
- `--echo` or `-e`. Boolean, whether to concatenate the response to the prompt or not.

</details>

<details>

<br/>

Below there is the expected schema for a json file. All the values are optional. For explanations and default values check [the schema file](./OpenAIOptions).

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

- Support multiple completions from json configuration using the option `n`.
- Support for `stream` option.
- Support html (cleaning up the tags.). This may be done during stream.
- Support pdf.
- Support both from urls as well.

The code is being thought such that it is not too difficult to adapt it to the browser.

## License

[MIT](./LICENSE)

There are no restrictions and you can do with the code what you prefer.

[1]: https://beta.openai.com/docs/api-reference/completions/create
[npm-image]: https://img.shields.io/npm/v/explainer-cli.svg
[npm-url]: https://www.npmjs.com/package/explainer-cli
[ci-image]: https://github.com/santimirandarp/explainer-cli/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/santimirandarp/explainer-cli/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/santimirandarp/explainer-cli.svg
[codecov-url]: https://codecov.io/gh/santimirandarp/explainer-cli
[download-image]: https://img.shields.io/npm/dm/explainer-cli.svg
[download-url]: https://www.npmjs.com/package/explainer-cli
