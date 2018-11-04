# @jahed/aws-lambda-package

Packages your NodeJS code to be executed on AWS Lambda.

## Installation

```bash
yarn add -D @jahed/aws-lambda-package
```

### Workspaces

If you're using workspaces, install it at the root package.

```bash
yarn add -W -D @jahed/aws-lambda-package
```

## Usage

### Building Single Packages

Running `aws-lambda-package` will do the following:

- Run `yarn pack` to create a `tgz` similar to `yarn publish`
- Extract the `tgz` to a temporary directory
- Run `yarn install --production` on the directory
- Create a ZIP of the directory's contents on your current working directory.
- You will have to upload your ZIP to AWS Lambda or S3
  manually (or using your own script)

```bash
yarn aws-lambda-package
```

If you're using workspaces and just want to build one workspace, you can do
the following:

```bash
yarn workspaces your-package-name aws-lambda-package
```

### Building all your workspaces

You can build all of your workspaces at once by running `aws-lambda-workspaces`
at the root package.

```bash
yarn aws-lambda-workspaces
```

## Caveats

- To ensure full compatibility, you may need to run `aws-lambda-package` in an
  environment similar to AWS Lambda. Try out 
  [`docker-lambda`](https://github.com/lambci/docker-lambda) if you run into
  this issue.

## Reasoning

A lot of ZIP tools assume Windows line separators (`\`) are okay. AWS Lambda 
however doesn't support these separators. So I made this project to work
across systems and remove as many caveats as possible.
