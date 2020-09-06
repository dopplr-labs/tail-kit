# Contribution Guide

## Development Information

### Requirements

- [Node v14.9.0](https://nodejs.org/) - Preferably use [nvm](https://github.com/nvm-sh/nvm) for installing `node`
- [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)

### Technologies Used

- [react](https://reactjs.org/) for development
- [tailwindcss](https://tailwindcss.com/) for styling
- [storybook](https://storybook.js.org/) for developing UI components in isolation
- [jest](https://jestjs.io/) and [react testing library](https://testing-library.com/docs/react-testing-library/intro) for testing

### Git Workflow

We use [gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for managing git. It is recommended to use [gitflow](https://github.com/nvie/gitflow/wiki/Installation) plugin.

The overall flow of Gitflow is:

- A develop branch is created from master
- A release branch is created from develop
- Feature branches are created from develop
- When a feature is complete it is merged into the develop branch
- When the release branch is done it is merged into develop and master
- If an issue in master is detected a hotfix branch is created from master
- Once the hotfix is complete it is merged to both develop and master

#### Feature branch

Create a feature branch when you are working on a feature such as implementation of a new UI component.

```sh
git flow feature start feature_branch
```

#### Hotfix branch

Maintenance or “hotfix” branches are used to quickly patch production releases.

```sh
git flow hotfix start hotfix_branch
```

### Commits

#### Commit Message

We're using conventional commits to ensure consistency of commit messages.

Always assign a prefix to your first commit in a new branch.

For more information, check the [convention](https://www.conventionalcommits.org/en/v1.0.0/).

Please see [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/) for information on how to write commit messages.

If the commit has a corresponding issue, make sure to add the reference to the issue in the commit message

```git
[ref-#329] Fixing the performance issue on the input field
```

#### Commit History

We are using merge to master with squashing commits.

**Bad:**

```git
* Add React
* add react-dom
* fix deps
* another fix
* fix test
```

**Good:**

```git
* feat: adding React & React-Dom
* fix: resolve peer dependencies of React
```

## Development Setup

### Starting with development

For local development you can use

- `yarn storybook`

### Testing

We encourage adding tests to all components. Jest is used for testing.

To run tests, you can use

- `yarn test` to run the tests in the watch mode
- `yarn test:ci` to run the tests in CI mode along with test coverage
