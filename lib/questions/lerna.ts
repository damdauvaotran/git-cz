import { getAllPackages, getChangedPackages, isLerna } from '../util/lerna';

interface State {
  config: any;
  root: string;
}

interface Question {
  choices: string[];
  default: string[];
  message: string;
  name: string;
  type: string;
}

export const createQuestion = (state: State): Question | null => {
  if (!isLerna(state)) {
    return null;
  }

  const changedPackages = getChangedPackages(state);
  const allPackages = getAllPackages(state);

  const question: Question = {
    choices: allPackages,
    default: changedPackages,
    message: `The packages that this commit has affected (${changedPackages.length} detected)\n`,
    name: 'packages',
    type: 'checkbox'
  };

  return question;
};
