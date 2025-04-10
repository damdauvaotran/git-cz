import { execSync } from 'child_process';

const getGitDir = (): string => {
  const devNull = process.platform === 'win32' ? ' nul' : '/dev/null';
  const dir = execSync('git rev-parse --absolute-git-dir 2>' + devNull)
    .toString()
    .trim();

  return dir;
};

export default getGitDir;
