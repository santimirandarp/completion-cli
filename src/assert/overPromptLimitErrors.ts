export default function (prompt: string) {
  if (prompt.length > 15000) {
    throw new Error('The prompt is too long. Please use a file instead.');
  }
}
