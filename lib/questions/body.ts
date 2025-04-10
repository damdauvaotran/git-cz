export const createQuestion = (): { message: string; name: string; type: string } => {
  const question = {
    message: 'Provide a longer description of the change:\n ',
    name: 'body',
    type: 'input'
  };

  return question;
};
