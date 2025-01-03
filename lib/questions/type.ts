import fuzzy from 'fuzzy';

interface Type {
  description: string;
  emoji: string;
  value: string;
}

interface Config {
  types: Record<string, Type>;
  disableEmoji: boolean;
  list: string[];
}

const typeToListItem = ({types, disableEmoji}: Config, type: string) => {
  const {description, emoji, value} = types[type];
  const prefix = emoji && !disableEmoji ? emoji + '  ' : '';

  return {
    name: prefix + (value + ':').padEnd(12, ' ') + description,
    value
  };
};

/**
 * Searches for the type that includes the given substring.
 *
 * @param {string} substring Substring to search with.
 * @param {Config} config The whole config.
 */
const findType = function (substring: string, config: Config) {
  const types = config.list;

  return Promise.resolve(fuzzy.filter(substring || '', types).map(({original: type}) => typeToListItem(config, type)));
};

export const createQuestion = (state: {config: Config}) => {
  const {config} = state;
  const question = {
    message: 'Select the type of change that you\'re committing:',
    name: 'type',
    source: (_answers: any, input: string) => findType(input, config),
    type: 'autocomplete'
  };

  return question;
};
