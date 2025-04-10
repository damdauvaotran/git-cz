import * as fuzzy from 'fuzzy';

/**
 * Searches for the scopes containing the given substring.
 *
 * @param {string} substring Substring to search with.
 * @param {string[]} scopes Scopes list.
 */
const findScope = function (substring: string, scopes: string[]): Promise<string[]> {
  return Promise.resolve(fuzzy.filter(substring || '', scopes).map(({original: scope}) => scope));
};

interface State {
  config: {
    scopes: string[];
  };
}

interface Question {
  message: string;
  name: string;
  source: (_answers: any, input: string) => Promise<string[]>;
  type: string;
}

export const createQuestion = (state: State): Question | null => {
  const {scopes} = state.config;

  if (!scopes) {
    return null;
  }

  if (!Array.isArray(scopes)) {
    throw new TypeError('scopes must be an array of strings.');
  }

  if (scopes.length < 1) {
    return null;
  }

  const question: Question = {
    message: 'Select the scope this component affects:',
    name: 'scope',
    source: (_answers, input) => findScope(input, scopes),
    type: 'autocomplete'
  };

  return question;
};
