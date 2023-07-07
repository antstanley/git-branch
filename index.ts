import { readFileSync, existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises'
// import * as find from 'find-up'

const findUp = await import('find-up')

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
  const filepath = findUp.findUpSync('.git/HEAD', { cwd: cwd });

  if (typeof filepath !== 'string') throw new Error('Unable to find .git/HEAD. Invalid path returned')
  if (!existsSync(filepath)) throw new Error('.git/HEAD does not exist');
  return filepath;
}

/**
 * Expose `branch`
 */

export default branch
