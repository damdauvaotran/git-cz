import chalk from 'chalk';
import InputPrompt from 'inquirer/lib/prompts/input';

interface LimitedInputPromptOptions {
  maxLength: number;
  message: string;
  leadingLabel?: string | ((answers: any) => string);
}

class LimitedInputPrompt extends InputPrompt {
  private originalMessage: string;
  private spacer: string;
  private leadingLabel: string;
  private leadingLength: number;

  constructor(...args: any[]) {
    super(...args);

    const opt = this.opt as LimitedInputPromptOptions;

    if (!opt.maxLength) {
      this.throwParamError('maxLength');
    }
    this.originalMessage = opt.message;
    this.spacer = new Array(opt.maxLength).fill('-').join('');

    if (opt.leadingLabel) {
      if (typeof opt.leadingLabel === 'function') {
        this.leadingLabel = ' ' + opt.leadingLabel(this.answers);
      } else {
        this.leadingLabel = ' ' + opt.leadingLabel;
      }
    } else {
      this.leadingLabel = '';
    }

    this.leadingLength = this.leadingLabel.length;
  }

  remainingChar(): number {
    return (this.opt as LimitedInputPromptOptions).maxLength - this.leadingLength - this.rl.line.length;
  }

  onKeypress(): void {
    if (this.rl.line.length > (this.opt as LimitedInputPromptOptions).maxLength - this.leadingLength) {
      this.rl.line = this.rl.line.slice(0, (this.opt as LimitedInputPromptOptions).maxLength - this.leadingLength);
      this.rl.cursor--;
    }

    this.render();
  }

  getCharsLeftText(): string {
    const chars = this.remainingChar();

    if (chars > 15) {
      return chalk.green(`${chars} chars left`);
    } else if (chars > 5) {
      return chalk.yellow(`${chars} chars left`);
    } else {
      return chalk.red(`${chars} chars left`);
    }
  }

  render(error?: string): void {
    let bottomContent = '';
    let message = this.getQuestion();
    let appendContent = '';
    const isFinal = this.status === 'answered';

    if (isFinal) {
      appendContent = this.answer;
    } else {
      appendContent = this.rl.line;
    }

    message = `${message}
  [${this.spacer}] ${this.getCharsLeftText()}
  ${this.leadingLabel} ${appendContent}`;

    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }
}

export default LimitedInputPrompt;
