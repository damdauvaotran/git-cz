import inquirer from 'inquirer';
import AutocompletePrompt from 'inquirer-list-search-prompt';
import LimitedInputPrompt from './LimitedInputPrompt';
import createQuestions from './createQuestions';

inquirer.registerPrompt('limitedInput', LimitedInputPrompt);
inquirer.registerPrompt('autocomplete', AutocompletePrompt);

interface State {
  answers: Record<string, any>;
  config: Record<string, any>;
}

const runInteractiveQuestions = async (state: State, cliAnswers: Record<string, any> = {}): Promise<Record<string, any>> => {
  Object.keys(cliAnswers).forEach((key) => {
    state.answers[key] = cliAnswers[key];
  });

  const questions = createQuestions(state, cliAnswers);
  const answers = await inquirer.prompt(questions);

  Object.keys(state.answers).forEach((key) => {
    if (answers[key]) {
      state.answers[key] = answers[key];
    }
  });

  return answers;
};

export default runInteractiveQuestions;
