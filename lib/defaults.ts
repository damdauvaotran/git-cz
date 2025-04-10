const format: string = '[{task}] {type}{scope}: {emoji}{subject}';

interface CommitType {
  description: string;
  emoji: string;
  value: string;
}

const types: Record<string, CommitType> = {
  chore: {
    description: 'Build process or auxiliary tool changes',
    emoji: '🤖',
    value: 'chore'
  },
  ci: {
    description: 'CI related changes',
    emoji: '🎡',
    value: 'ci'
  },
  docs: {
    description: 'Documentation only changes',
    emoji: '✏️',
    value: 'docs'
  },
  feat: {
    description: 'A new feature',
    emoji: '🎸',
    value: 'feat'
  },
  fix: {
    description: 'A bug fix',
    emoji: '🐛',
    value: 'fix'
  },
  perf: {
    description: 'A code change that improves performance',
    emoji: '⚡️',
    value: 'perf'
  },
  refactor: {
    description: 'A code change that neither fixes a bug or adds a feature',
    emoji: '💡',
    value: 'refactor'
  },
  release: {
    description: 'Create a release commit',
    emoji: '🏹',
    value: 'release'
  },
  style: {
    description: 'Markup, white-space, formatting, missing semi-colons...',
    emoji: '💄',
    value: 'style'
  },
  test: {
    description: 'Adding missing tests',
    emoji: '💍',
    value: 'test'
  }
};

// https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type
const list: string[] = [
  'test',
  'feat',
  'fix',
  'chore',
  'docs',
  'refactor',
  'style',
  'ci',
  'perf'
];

// https://github.com/angular/angular/blob/master/CONTRIBUTING.md#scope
const scopes: string[] = [];

const questions: string[] = [
  'type',
  'scope',
  'subject',
  'body',
  'breaking',
  'issues',
  'lerna'
];

interface Config {
  breakingChangePrefix: string;
  closedIssueMessage: string;
  closedIssuePrefix: string;
  format: string;
  list: string[];
  maxMessageLength: number;
  minMessageLength: number;
  questions: string[];
  scopes: string[];
  types: Record<string, CommitType>;
}

const config: Config = {
  breakingChangePrefix: '🧨 ',
  closedIssueMessage: 'Closes: ',
  closedIssuePrefix: '✅ ',
  format,
  list,
  maxMessageLength: 64,
  minMessageLength: 3,
  questions,
  scopes,
  types
};

export default config;
