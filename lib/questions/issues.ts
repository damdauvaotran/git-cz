export const createQuestion = (): { message: string; name: string; type: string } => ({
  message: 'Issues this commit closes, e.g #123:',
  name: 'issues',
  type: 'input'
});
