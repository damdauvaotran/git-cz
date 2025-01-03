import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

interface State {
  root: string;
}

const isLerna = (state: State): boolean =>
  fs.existsSync(path.join(state.root, 'lerna.json'));

const isDir = (root: string) => (name: string): boolean => {
  const filepath = path.join(root, name);

  try {
    const stats = fs.statSync(filepath);

    return stats.isDirectory();
  } catch (error) {
    return false;
  }
};

const removeLastDirectoryPartOf = (url: string): string => url.substring(0, url.lastIndexOf('/'));

const getPackageDirectories = (state: State): string[] => {
  const pkgFilename = path.join(state.root, 'package.json');

  if (fs.existsSync(pkgFilename)) {
    try {
      const workspacesConfig = require(String(pkgFilename)).workspaces;
      const workspacePackages = Array.isArray(workspacesConfig) ? workspacesConfig : workspacesConfig.packages;

      if (workspacePackages && workspacePackages.length) {
        return workspacePackages
          .filter((workspacePackage: string) => workspacePackage.endsWith('*'))
          .map((workspacePackage: string) =>
            removeLastDirectoryPartOf(String(workspacePackage))

          // else {
          // TODO: support paths that do not end with '*', in that case the package it self is the directory so we don't need to look at inner directories
          //   return workspacePackage
          // }
          );

        // Remove the /* on the tail
      }
    // eslint-disable-next-line no-empty
    } catch (error) {
    }
  }

  return ['packages'];
};

const getAllPackages = (state: State): string[] => {
  try {
    const dirs = getPackageDirectories(state).map((dir) => path.join(state.root, dir));

    return dirs.flatMap((dir) => fs.readdirSync(dir).filter(isDir(dir)));
  } catch (error) {
    return [];
  }
};

const getChangedFiles = (): string[] => {
  const devNull = process.platform === 'win32' ? ' nul' : '/dev/null';

  return execSync('git diff --cached --name-only 2>' + devNull)
    .toString()
    .trim()
    .split('\n');
};

const getChangedPackages = (state: State): string[] => {
  const unique: { [key: string]: number } = {};
  const changedFiles = getChangedFiles();
  const regex = new RegExp('^' + getPackageDirectories(state) + '\/([^/]+)\/', 'is');

  for (const filename of changedFiles) {
    const matches = filename.match(regex);

    if (matches) {
      unique[matches[1]] = 1;
    }
  }

  return Object.keys(unique);
};

export {
  getAllPackages,
  getChangedPackages,
  isLerna
};
