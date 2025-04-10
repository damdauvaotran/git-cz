import qBody from './questions/body';
import qBreaking from './questions/breaking';
import qIssues from './questions/issues';
import qLerna from './questions/lerna';
import qScope from './questions/scope';
import qSubject from './questions/subject';
import qType from './questions/type';

interface State {
  config: {
    questions: string[];
    messages?: Record<string, string>;
  };
}

interface Question {
  message: string;
  name: string;
  type: string;
}

const creators: Record<string, { createQuestion: (state: State) => Question | null }> = {
  body: qBody,
  breaking: qBreaking,
  issues: qIssues,
  lerna: qLerna,
  scope: qScope,
  subject: qSubject,
  type: qType
};

const createQuestions = (state: State, cliAnswers: Record<string, any>): Question[] => {
  const questions = state.config.questions
    .filter((name) => cliAnswers[name] === undefined)
    .map((name) => {
      const question = creators[name].createQuestion(state);

      if (state.config.messages && state.config.messages[name]) {
        question.message = state.config.messages[name];
      }

      return question;
    });

  return questions.filter(Boolean) as Question[];
};

export default createQuestions;
