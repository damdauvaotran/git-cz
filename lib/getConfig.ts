import path from 'path';
import fs from 'fs';
import os from 'os';
import signale from 'signale';
import defaults from './defaults';

interface Config {
  disableEmoji: boolean;
  format: string;
  list: string[];
  maxMessageLength: number;
  minMessageLength: number;
  questions: string[];
  scopes: string[];
  types: Record<string, { description: string; emoji: string; value: string }>;
  breakingChangePrefix: string;
  closedIssueMessage: string;
  closedIssuePrefix: string;
}

const configFiles = [
  '.git-cz.json',
  'changelog.config.js',
  'changelog.config.cjs',
  'changelog.config.json'
];

const findOverrides = (root: string): Partial<Config> => {
  const dir = root || process.cwd();

  for (const file of configFiles) {
    const filename = path.resolve(dir, file);

    if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
      return require(filename);
    }
  }

  const parent = path.resolve(dir, '..');

  const pkgFilename = path.join(dir, 'package.json');

  if (fs.existsSync(pkgFilename)) {
    try {
      const changelog = require(pkgFilename).config.commitizen.changelog;

      if (changelog) {
        return changelog;
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  if (parent !== dir) {
    return findOverrides(parent);
  }

  // If no overrides are found, check the user's home directory
  const home = os.homedir();

  for (const file of configFiles) {
    const filename = path.resolve(home, file);

    if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
      return require(filename);
    }
  }

  return {};
};

const getConfig = (root: string): Config => {
  const overrides = findOverrides(root);

  if (typeof overrides !== 'object') {
    signale.fatal(new TypeError('Expected changelog config to be an object.'));

    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  return {
    ...defaults,
    ...overrides
  };
};

export default getConfig;
