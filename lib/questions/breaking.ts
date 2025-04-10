import chalk from 'chalk';

export const createQuestion = (): { message: string; name: string; type: string } => {
  const question = {
    message: `List any breaking changes\n  ${chalk.red('BREAKING CHANGE')}:`,
    name: 'breaking',
    type: 'input'
  };

  return question;
};
