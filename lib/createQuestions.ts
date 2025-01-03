/* eslint-disable import/no-dynamic-require, global-require */
import qBody from './questions/body';
import qBreaking from './questions/breaking';
import qIssues from './questions/issues';
import qLerna from './questions/lerna';
import qScope from './questions/scope';
import qSubject from './questions/subject';
import qType from './questions/type';

const creators = {
  body: qBody,
  breaking: qBreaking,
  issues: qIssues,
  lerna: qLerna,
  scope: qScope,
  subject: qSubject,
  type: qType
};

const createQuestions = (state: any, cliAnswers: any) => {
  const questions = state.config.questions
    .filter((name: string) => cliAnswers[name] === undefined)
    .map((name: string) => {
      const question = creators[name].createQuestion(state);

      if (state.config.messages && state.config.messages[name]) {
        question.message = state.config.messages[name];
      }

      return question;
    });

  return questions.filter(Boolean);
};

export default createQuestions;
