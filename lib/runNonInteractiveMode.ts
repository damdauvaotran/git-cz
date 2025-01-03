const runNonInteractiveMode = (state: any, {type = 'chore', subject = 'automated commit', ...restAnswers}: any) => {
  const answers = {
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
