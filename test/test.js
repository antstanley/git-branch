'use strict';

const { spawnSync } = require('node:child_process');
const path = require('path');
const assert = require('assert');
const fs = require('fs')
const branch = require('..');
const fixtures = path.join(process.cwd(), 'fixtures');

function create(folderName) {
  if (fs.existsSync(folderName)) fs.rmSync(folderName, { recursive: true })
  fs.mkdirSync(folderName)
  spawnSync('git', ['init', '-q', '--initial-branch=main'], { cwd: folderName })
}

function cleanUp(folderName) {
  if (fs.existsSync(folderName)) fs.rmSync(folderName, { recursive: true })
}

before(() => create(fixtures));
after(() => cleanUp(fixtures));

describe('git-branch', function() {
  it('should get branch (sync)', () => assert.equal(branch.sync(fixtures), 'main'));
  it('should get branch (promise)', async () => {
    return branch(fixtures).then(res => assert.equal(res, 'main'));
  });
  it('should get branch (async)', function(cb) {
    branch(fixtures, function(err, res) {
      if (err) return cb(err);
      assert.equal(res, 'main');
      cb();
    });
  });
});
