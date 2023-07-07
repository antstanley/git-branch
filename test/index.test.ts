'use strict';

import { spawnSync } from 'node:child_process';
import { expect, beforeAll, afterAll, describe, test } from 'vitest'
import { join } from 'path'
import fs from 'fs'
import branch from '../index'


const fixtures = join(process.cwd(), 'fixtures');

function create(folderName: string) {
  console.log('create!')
  if (fs.existsSync(folderName)) fs.rmSync(folderName, { recursive: true })
  fs.mkdirSync(folderName)
  spawnSync('git', ['init', '-q', '--initial-branch=main'], { cwd: folderName })
}

function cleanUp(folderName: string) {
  if (fs.existsSync(folderName)) fs.rmSync(folderName, { recursive: true })
}

describe('git-branch', async () => {

  beforeAll(() => create(fixtures));
  afterAll(() => cleanUp(fixtures));

  test('should get branch (sync)', () => expect(branch.sync(fixtures)).toBe('main'));

  test('should get branch (promise)', async () => {
    const branchResponse = await branch(fixtures)
    return expect(branchResponse).toBe('main');
  });

  test('should get branch (async)', function(cb: Function) {
    branch(fixtures, function(err: Error, res: string) {

      expect(res).toBe('main');
      expect(err).toBeNull()

    });
  });
});
