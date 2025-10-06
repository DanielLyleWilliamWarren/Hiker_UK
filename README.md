# Angular Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4

### Note

After modifying the stages in `ci-kube-deploy`, the `ref` in the pipeline must be edited to the ci-kube-deploy branch name.

## Background

This repository is designed to act as a base for all Angular projects so that we are using consistent tooling and standards across all of our projects.

Everything you need to get started and working is already configured:

- ESLint
- Prettier
- Husky & commitlint
- Stylelint
- PNPM
- Tailwind

## Notes

If you don't have PNPM installed on your machine, follow the set-up instructions [here](https://pnpm.io/installation).

Cloning this repo will maintain the connection to the remote Gitlab URL. Remember to change the origin by running:

- `git remote set-url origin <your-repo-url>`
- `git remote -v`

## Getting started

- `pnpm install`
- `pnpm run start`
