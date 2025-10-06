# BGS Angular Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Latest Update - April 11, 2024

By the latest version of the Angular Template the desired modifications on the different stages can be done in [ci-kube-deploy](https://kwvmxgit.ad.nerc.ac.uk/devops/ci-kube-deploy) branches for the different projects' specifications.

### Note

After modifying the stages in `ci-kube-deploy`, the `ref` in the pipeline must be edited to the ci-kube-deploy branch name.

## Imports

The stages in the BGS Angular Template are included from:
- `devops/ci-kube-deploy/angular-template/` for the following stages:
  * app-tests
  * build-prod
  * build-nginx
  * test
  * deploy
  * release
- `devops/ci-security-scan/` for the security scan stages:
  * container-scan
  * sonar-scan

## Background

This repository is designed to act as a base for all BGS Angular projects so that we are using consistent tooling and standards across all of our projects.

Everything you need to get started and working is already configured:

- ESLint
- Prettier
- Husky & commitlint
- Stylelint
- PNPM
- Tailwind

Also included is configuration for deploying an Angular app to Kubernetes. More detailed instructions can be found [here](https://kwvmxgit.ad.nerc.ac.uk/javascript/demo-ng-k8s).

### Skip option for security stages

In the new update, there is this option to skip the security stages by changing the value of the following variables in the pipeline:

```yaml
  SKIP_CONTAINER_SCAN: "false"
  SKIP_SONAR_SCAN: "false"   
```
By setting each variable "true", the stage can be skipped easily.

### Dynamic Docker Build Arguments

Our CI/CD pipeline introduces the capability to dynamically pass build arguments to Docker builds, allowing for more flexible configurations and the injection of environment-specific variables directly into the build process. This feature supports up to five custom build arguments, enhancing security and efficiency by avoiding hard-coded values.

#### How to Use

1. **Define Build Arguments**: In the `.gitlab-ci.yml` or GitLab CI/CD project settings, define your build arguments using the `BUILD_ARG_NAME{i}` and `BUILD_ARG_VALUE{i}` format, where `i` is the argument index (1 to 5).

    Example:
    ```yaml
    variables:
      BUILD_ARG_NAME1: "EXAMPLE_ARG1"
      BUILD_ARG_VALUE1: "ExampleValue1"
    ```

2. **Trigger a Pipeline Run**: With your arguments defined, start a new pipeline run. The arguments will automatically be passed to the Docker build command, allowing for their use in the build process without needing direct Dockerfile modifications for each argument.

### Docker dind upgrade

In the template, docker:20.10.17-dind image is now upgraded to docker:26.0.0-dind, which has the following features and capabilities:

- Enhanced Build Performance with BuildKit
- Improved Dockerfile Capabilities
- Security Improvements
- Build and Image Optimization
- Operational Efficiency and Compatibility
- Forward Compatibility

## Notes

If you don't have PNPM installed on your machine, follow the set-up instructions [here](https://pnpm.io/installation).

Cloning this repo will maintain the connection to the remote Gitlab URL. Remember to change the origin by running:

- `git remote set-url origin <your-repo-url>`
- `git remote -v`

## Getting started

- `pnpm install`
- `pnpm run start`
