import createState from './createState';
import runInteractiveQuestions from './runInteractiveQuestions';
import formatCommitMessage from './formatCommitMessage';

export const prompter = (cz: any, commit: (message: string) => void) => {
  const run = async () => {
    const state = createState();

    await runInteractiveQuestions(state);

    const message = formatCommitMessage(state);

    return commit(message);
  };

  run();
};
