import { Question } from 'inquirer';

export const createQuestion = (): Question => {
  const question: Question = {
    message: 'Provide a longer description of the change:\n ',
    name: 'body',
    type: 'input'
  };

  return question;
};
