import fuzzy from 'fuzzy';

interface State {
  config: {
    scopes: string[];
  };
}

/**
 * Searches for the scopes containing the given substring.
 *
 * @param {string} substring Substring to search with.
 * @param {string[]} scopes Scopes list.
 */
const findScope = function (substring: string, scopes: string[]): Promise<string[]> {
  return Promise.resolve(fuzzy.filter(substring || '', scopes).map(({ original: scope }) => scope));
};

export const createQuestion = (state: State) => {
  const { scopes } = state.config;

  if (!scopes) {
    return null;
  }

  if (!Array.isArray(scopes)) {
    throw new TypeError('scopes must be an array of strings.');
  }

  if (scopes.length < 1) {
    return null;
  }

  const question = {
    message: 'Select the scope this component affects:',
    name: 'scope',
    source: (_answers: any, input: string) => findScope(input, scopes),
    type: 'autocomplete'
  };

  return question;
};
