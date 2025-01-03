import { spawn, execSync } from 'child_process';
import fs from 'fs';
import { join } from 'path';
import shellescape from 'any-shell-escape';
import signale from 'signale';
import parseArgs from './parseArgs';
import createState from './createState';
import runInteractiveQuestions from './runInteractiveQuestions';
import runNonInteractiveMode from './runNonInteractiveMode';
import formatCommitMessage from './formatCommitMessage';
import getGitDir from './util/getGitDir';

const executeCommand = (command: string, env: NodeJS.ProcessEnv = process.env): void => {
  const proc = spawn(command, [], {
    env,
    shell: true,
    stdio: [0, 1, 2]
  });

  proc.on('close', (code) => {
    process.exit(code);
  });
};

const main = async (): Promise<void> => {
  try {
    const { cliAnswers, cliOptions, passThroughParams } = parseArgs();

    let state = null;

    if (cliOptions.disableEmoji) {
      state = createState({ disableEmoji: cliOptions.disableEmoji });
    } else {
      state = createState();
    }

    if (cliOptions.dryRun) {
      console.log('Running in dry mode.');
    } else if (
      !passThroughParams['allow-empty'] &&
      !passThroughParams.a &&
      !passThroughParams.amend
    ) {
      try {
        execSync('git diff HEAD --staged --quiet --exit-code');
        signale.error('No files staged!');
        process.exit(0);
      } catch (error) {
      }
    }

    if (cliOptions.nonInteractive) {
      await runNonInteractiveMode(state, cliAnswers);
    } else {
      await runInteractiveQuestions(state, cliAnswers);
    }

    const message = formatCommitMessage(state);

    const appendedArgs: string[] = [];

    for (const key in passThroughParams) {
      const value = passThroughParams[key];

      if (key.length === 1) {
        appendedArgs.push('-' + key);
      } else {
        appendedArgs.push('--' + key);
      }

      if (value !== true) {
        appendedArgs.push(value);
      }
    }

    const commitMsgFile = join(getGitDir(), 'COMMIT_EDITMSG');

    const command = shellescape([
      'git',
      'commit',
      '--file',
      commitMsgFile,
      ...appendedArgs
    ]);

    if (cliOptions.dryRun) {
      console.log('Will execute command:');
      console.log(command.replace(commitMsgFile, '.git/COMMIT_EDITMSG'));
      console.log('Message:');
      console.log(message);
    } else {
      fs.writeFileSync(commitMsgFile, message);

      if (cliOptions.hook) {
        process.exit(0);
      }

      executeCommand(command);
    }
  } catch (error) {
    signale.fatal(error);
  }
};

main();
