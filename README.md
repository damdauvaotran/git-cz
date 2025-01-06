[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# git-cz

![image](https://user-images.githubusercontent.com/9773803/49760520-fa6c6f00-fcc4-11e8-84c4-80727f071487.png)

### Without installation

```shell
npx @damdauvaotran/git-cz
# or
npx @damdauvaotran/git-cz -e
```

### Install globally standalone

```shell
npm install -g @damdauvaotran/git-cz
git-cz
# or
git-cz -e
```

### Install locally with Commitizen

```shell
npm install -g commitizen
npm install --save-dev @damdauvaotran/git-cz
```

`package.json`:

```json
{
  "config": {
    "commitizen": {
      "path": "@damdauvaotran/git-cz"
    }
  }
}
```

run:

```shell
git cz
```

### Install globally with Commitizen

```shell
npm install -g commitizen @damdauvaotran/git-cz
commitizen init @damdauvaotran/git-cz --save-dev --save-exact
```

run:

```shell
git cz
```

## Custom config

You can provide a custom configuration in a `changelog.config.js` file in your repo, or in any parent folder.
git-cz will search for the closest config file.
Below is default config:

```js
module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [],
  types: {
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
    },
    messages: {
      type: 'Select the type of change that you\'re committing:',
      customScope: 'Select the scope this component affects:',
      subject: 'Write a short, imperative mood description of the change:\n',
      body: 'Provide a longer description of the change:\n ',
      breaking: 'List any breaking changes:\n',
      footer: 'Issues this commit closes, e.g #123:',
      confirmCommit: 'The packages that this commit has affected\n',
    },
  }
};
```

## Non-interactive mode

Using `--non-interactive` flag you can run `git-cz` non-interactive mode.

For example:

```bash
git-cz --non-interactive --type=feat --subject="add onClick prop to component"
```

CLI parameters:

- `--type`
- `--subject`
- `--scope`
- `--body`
- `--breaking`
- `--issues`
- `--lerna`

## Disable Emoji

Using `--disable-emoji` flag will disable emoji.

For example:

```bash
git-cz --disable-emoji
```

## Commit message format

- A commit message consists of a **header**, **body** and **footer**.
- The header has a **type** and a **subject**:

```bash
<type>[(<scope>)]: <emoji> <subject>
[BLANK LINE]
[body]
[BLANK LINE]
[breaking changes]
[BLANK LINE]
[footer]
```

The **header** is the only mandatory part of the commit message.

The first line (type + subject) is limited to 50 characters **[enforced]**

Any other line should be limited to 72 character **[automatic wrapping]**

This allows the message to be easier to read on GitHub as well as in various git tools.

### Format

By default the subject format is: `{type}{scope}: {subject}`

Configuring the `format` field in `.git-cz.json` you can customize your own:

- `{type}{scope}: {emoji}{subject}`
- `{emoji}{scope} {subject}`

You can also use the `--format` option to specify a custom format for the commit message. For example:

```bash
git-cz --format="{type}{scope}: {emoji}{subject} [{branch}]"
```

### Type

Must be one of the following:

- `test` &mdash; Adding missing tests
- `feat` &mdash; A new feature
- `fix` &mdash; A bug fix
- `chore` &mdash; Build process or auxiliary tool changes
- `docs` &mdash; Documentation only changes
- `refactor` &mdash; A code change that neither fixes a bug or adds a feature
- `style` &mdash; Markup, white-space, formatting, missing semi-colons...
- `ci` &mdash; CI related changes
- `perf` &mdash; A code change that improves performance

### Subject

The subject contains succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- No dot (.) at the end.

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Affects [only on [lerna](https://lernajs.io/) environments]

Select the packages the commit affected.

### Breaking Changes

**Breaking Changes** must start with the words `BREAKING CHANGE: `.

### Footer

The footer is the place to reference any tasks related to this commit.

## New Task Variable in Format

You can now use a new task variable in the format. The task variable is extracted from the branch name using a regular expression. The default regular expression looks for the task ID in branch names that follow the pattern `feature/task-id` or `tasks/task-id`.

For example, if your branch name is `feature/123-add-new-feature`, the task variable will be `123-add-new-feature`.

To use the task variable in your commit message format, include `{task}` in the format string. For example:

```bash
git-cz --format="{type}{scope}: {emoji}{subject} [{task}]"
```

## Prioritizing Config File in Home Folder

The configuration file can now be prioritized in the home folder. If a configuration file is found in the home folder, it will be used instead of searching for a configuration file in the repository or parent folders.

The supported configuration files are:

- `.git-cz.json`
- `changelog.config.js`
- `changelog.config.cjs`
- `changelog.config.json`

## Examples and Instructions for Using the New Task Variable

Here are some examples and instructions for using the new task variable in the format:

1. Ensure your branch name follows the pattern `feature/task-id` or `tasks/task-id`.
2. Use the `--format` option to specify a custom format that includes the `{task}` variable.
3. Run `git-cz` with the custom format.

For example:

```bash
git checkout -b feature/123-add-new-feature
git-cz --format="{type}{scope}: {emoji}{subject} [{task}]"
```

This will generate a commit message with the task ID extracted from the branch name and included in the commit message.
