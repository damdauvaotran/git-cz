import createState from './createState';
import runInteractiveQuestions from './runInteractiveQuestions';
import formatCommitMessage from './formatCommitMessage';

interface Commitizen {
  (message: string): void;
}

export const prompter = (cz: any, commit: Commitizen) => {
  const run = async () => {
    const state = createState();

    await runInteractiveQuestions(state);

    const message = formatCommitMessage(state);

    return commit(message);
  };

  run();
};
