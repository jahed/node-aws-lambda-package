# @jahed/aws-lambda-package

Packages your code to be executed on AWS Lambda.

## Installation

```bash
yarn add @jahed/terraform
```

## Usage

Running `aws-lambda-package` will do the following:

- Run `yarn pack` to create a `tgz` similar to `yarn publish`
- Extract the `tgz` to a temporary directory
- Run `yarn install --production` on the directory
- Create a ZIP of the directory's contents on your current working directory.

```bash
yarn aws-lambda-package
```

## Caveats

- To ensure full compatibility, you may need to run `aws-lambda-package` in an
  environment similar to AWS Lambda. Try out 
  [`docker-lambda`](https://github.com/lambci/docker-lambda) if you run into
  this issue.

## Reasoning

A lot of ZIP tools assume Windows line separators (`\`) are okay. AWS Lambda 
however doesn't support these separators.
