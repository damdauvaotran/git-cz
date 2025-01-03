import getGitRootDir from './util/getGitRootDir';
import getConfig from './getConfig';

interface State {
  answers: {
    body: string;
    breaking: string;
    issues: string;
    lerna: string;
    scope: string;
    subject: string;
    type: string;
  };
  config: any;
  root: string;
}

const createState = (config: any = {}): State => {
  let root: string;

  try {
    root = getGitRootDir();
  } catch (error) {
    throw new Error('Could not find Git root folder.');
  }

  const state: State = {
    answers: {
      body: '',
      breaking: '',
      issues: '',
      lerna: '',
      scope: '',
      subject: '',
      type: ''
    },
    config: {
      ...getConfig(root),
      ...config
    },
    root
  };

  return state;
};

export default createState;
