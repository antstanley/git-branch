'use strict';

import { spawnSync } from 'node:child_process';
import { expect, beforeAll, afterAll, describe, test } from 'vitest'
import { join } from 'node:path'
import { mkdirSync, existsSync, rmSync } from 'node:fs'
import branch from '../index.js'

const fixturesBase = join(process.cwd(), 'fixtures');

function create(folderName: string, worktree?: boolean) {
  if (existsSync(folderName)) rmSync(folderName, { recursive: true })
  mkdirSync(folderName, { recursive: true })

  if (worktree) {
    spawnSync('git', ['worktree', 'add', '--initial-branch=main', folderName], { cwd: folderName })
  } else {
    spawnSync('git', ['init', '-q', '--initial-branch=main'], { cwd: folderName })
  }
}

function cleanUp(folderName: string) {
  if (existsSync(folderName)) rmSync(folderName, { recursive: true })
}

afterAll(() => { cleanUp(fixturesBase) })

describe('git-branch base', async () => {
  const fixturesGit = join(fixturesBase, 'git');

  beforeAll(() => create(fixturesGit));
  afterAll(() => cleanUp(fixturesGit));

  test('should get branch (sync)', () => expect(branch.sync(fixturesGit)).toBe('main'));

  test('should get branch (promise)', async () => {
    const branchResponse = await branch(fixturesGit)
    return expect(branchResponse).toBe('main');
  });

  test('should get branch (callback)', () => {
    branch(fixturesGit, function(err: Error, res: string) {
      expect(res).toBe('main');
      expect(err).toBeNull()
    });
  });
});

describe('git-branch-ts worktree support', async () => {
  const fixturesWorktree = join(fixturesBase, 'worktree');
  beforeAll(() => create(fixturesWorktree));
  afterAll(() => cleanUp(fixturesWorktree));

  test('should get branch (sync)', () => expect(branch.sync(fixturesWorktree)).toBe('main'));

  test('should get branch (promise)', async () => {
    const branchResponse = await branch(fixturesWorktree)
    return expect(branchResponse).toBe('main');
  });

  test('should get branch (callback)', () => {
    branch(fixturesWorktree, function(err: Error, res: string) {
      expect(res).toBe('main');
      expect(err).toBeNull()
    });
  });
});
