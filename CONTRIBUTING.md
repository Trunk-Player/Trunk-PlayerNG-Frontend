# Contributing

Thank you for your interest in contributing to the frontend project. This guide needs some work but here are a few things to get you started.

## Visual Studio Code Dev Container

This project contains a Visual Studio Code `.devcontainer` configuration folder. This [Dev Container](https://code.visualstudio.com/docs/remote/containers) will install Node.Js, pre-commit (and install the hooks), and run npm install for you, so the image is ready to go after building. It also installs HomeBrew. If you have GitHub Codespaces, just start one with this project, let it build, and you are ready with all the below requirements and can start coding. Same for using Docker on your local machine with Visual Studio Code's Docker Remote Extension.

## Linting & Commit Hooks

We use [pre-commit](https://pre-commit.com/) for our linting and quality control tooling, so it is required that you install the pre-commit hooks (normal and commit-msg stages) so that your PR meets our quality control standards. If you fail to do this, we have [pre-commit.ci](https://pre-commit.ci/) configured on all PRs, and it will flag up any errors there may be.

There is also commitlint (which is included in our pre-commit config) in place, which is configured to use the [conventional commit](https://www.conventionalcommits.org/) standard. If your PR does not meet the specified standard, changes may be requested or your changes may be rejected.

```bash
# After installing pre-commit...
$ pre-commit install
$ pre-commit install --hook-type commit-msg
```

## Merge Commits

Merge commits must be styled as follows:

```
chore(merge): from_branch -> to_branch
```

For example, if you had merged `main` into `develop`:

```
chore(merge): main -> develop
```
