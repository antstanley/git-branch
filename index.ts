import { readFileSync, existsSync, lstatSync } from 'node:fs';
import { readFile } from 'node:fs/promises'
import { normalize, sep, join, relative } from 'node:path'

function findGitRoot(start: string | string[]) {
  if (typeof start === 'string') {
    if (start[start.length - 1] !== sep) {
      start += sep
    }
    start = normalize(start)
    start = start.split(sep)
  }
  if (!start.length) {
    throw new Error('.git/ not found in path')
  }
  start.pop()
  var dir = start.join(sep)
  var fullPath = join(dir, '.git')
  if (existsSync(fullPath)) {
    if (!lstatSync(fullPath).isDirectory()) {
      var content = readFileSync(fullPath, { encoding: 'utf-8' })
      var match = /^gitdir: (.*)\s*$/.exec(content)
      if (match) {
        return normalize(match[1])
      }
    }
    return normalize(fullPath)
  } else {
    return findGitRoot(start)
  }
}

function sync(cwd: string): string {
  const fileBuffer = readFileSync(gitHeadPath(cwd))
  const branchName = parseBranch(fileBuffer)
  return branchName ?? ''
};

function branch(cwd: string | Function, callback?: Function): void | Promise<string | null> {
  if (typeof cwd === 'function') {
    callback = cwd;
    cwd = process.cwd();
  }

  if (typeof callback === 'function') {
    try {
      const branchName = sync(cwd)
      callback(null, branchName)
    } catch (error) {
      callback(error)
    }
    return;
  } else {
    return readFile(gitHeadPath(cwd)).then(buf => parseBranch(buf));;
  }
}

branch.sync = sync

function parseBranch(buf: Buffer) {
  const match = /ref: refs\/heads\/([^\n]+)/.exec(buf.toString());
  return match ? match[1] : null;
}

function gitHeadPath(cwd: string): string {
  const filepath = join(findGitRoot(cwd), "HEAD")
  if (!existsSync(filepath)) throw new Error(`${relative(cwd, filepath)} does not exist`);
  return filepath;
}

/**
 * Expose `branch`
 */

export default branch