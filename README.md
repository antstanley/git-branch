# git-branch [![NPM version](https://img.shields.io/npm/v/git-branch.svg?style=flat)](https://www.npmjs.com/package/git-branch) [![NPM monthly downloads](https://img.shields.io/npm/dm/git-branch.svg?style=flat)](https://npmjs.org/package/git-branch) [![NPM total downloads](https://img.shields.io/npm/dt/git-branch.svg?style=flat)](https://npmjs.org/package/git-branch) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/git-branch.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/git-branch)

> Get the current branch from the local git repository.

This is a fork of `[git-branch](https://github.com/jonschlinkert/git-branch)` by [Jon Schlinkert](https://github.com/jonschlinkert), updated to add TypeScript and ES module support.

It maintains API compatibility with `git-branch` package

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install git-branch-ts
```

## Usage

```ts
import branch from 'git-branch-ts';
```

Optionally pass the cwd (current working directory) as the first argument.

**Async/Await**

```ts
const branchName = await branch('some/path') //=> 'Branch: main'

if (!branchName) console.error('Unable to find branch name')

```

**Promise**

```ts
branch('some/path')
  .then(name => console.log('Branch:', name)) //=> 'Branch: main'
  .catch(console.error);
```

**Callback**

```ts
branch(function(err: Error, name: string) {
  if (err) throw err;
  console.log('Branch:', name); //=> 'Branch: main'
});
```

**Sync**

```ts
console.log('Branch:', branch.sync()); //=> 'Branch: main'
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

### License

Released under the [MIT License](LICENSE).
