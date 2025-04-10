interface Answers {
  type?: string;
  subject?: string;
  [key: string]: any;
}

interface State {
  answers: {
    [key: string]: string;
  };
}

const runNonInteractiveMode = (state: State, { type = 'chore', subject = 'automated commit', ...restAnswers }: Answers): void => {
  const answers: Answers = {
    subject,
    type,
    ...restAnswers
  };

  Object.keys(state.answers).forEach((key) => {
    if (answers[key]) {
      state.answers[key] = answers[key];
      delete answers[key];
    }
  });
};

export default runNonInteractiveMode;
