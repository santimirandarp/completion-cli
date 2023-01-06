import { type CliOptions } from '../cliOptions.js';
import { type JSONConfig } from '../types.js';

export default function (cli: Partial<CliOptions>, json: Partial<JSONConfig>) {
  /* A text input must exist. */
  if (!(cli?.filePath ?? cli?.prompt ?? json.prompt)) {
    throw new Error(
      'Missing prompt, expected --prompt <text> or --filePath <path> or --jsonConfig <path>',
    );
  }

  /* But not more than one */
  if (
    (cli?.filePath && cli?.prompt) ||
    (cli?.filePath && json.prompt) ||
    (cli?.prompt && json.prompt)
  ) {
    throw new Error(
      'Only one of --filePath or --prompt  or json.prompt is allowed',
    );
  }
}
