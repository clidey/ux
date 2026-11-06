import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { nextVersion, parseVersion, prepareVersion, commitVersion } from './release-version.mjs';

const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'ux-release-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const root = join(directory, 'checkout');
  const remote = join(directory, 'remote.git');
  mkdirSync(root);
  git(directory, 'init', '--bare', remote);
  git(root, 'init', '--initial-branch=main');
  git(root, 'config', 'user.name', 'Fixture');
  git(root, 'config', 'user.email', 'fixture@example.test');
  mkdirSync(join(root, 'docs'));
  writeFileSync(join(root, 'package.json'), JSON.stringify({ name: '@clidey/ux', version: '1.6.4', dependencies: { fixture: '1.0.0' } }, null, 2) + '\n');
  writeFileSync(join(root, 'docs/dory.json'), '{"version":"1.6.4 · Latest"}\n');
  writeFileSync(join(root, 'pnpm-lock.yaml'), 'lockfileVersion: 9.0\n');
  git(root, 'add', '.');
  git(root, 'commit', '-m', 'fixture');
  git(root, 'remote', 'add', 'origin', remote);
  git(root, 'push', 'origin', 'main');
  return { root, remote, source: git(root, 'rev-parse', 'HEAD') };
}

test('major, minor and patch increment the highest stable manifest or tag version', () => {
  assert.equal(nextVersion('1.6.4', [], 'patch'), '1.6.5');
  assert.equal(nextVersion('1.6.4', [], 'minor'), '1.7.0');
  assert.equal(nextVersion('1.6.4', [], 'major'), '2.0.0');
  assert.equal(nextVersion('0.0.0', [], 'patch'), '0.0.1');
  assert.equal(nextVersion('1.6.4', ['v1.10.9', 'v1.6.5', 'v2.0.0-beta.1', 'unrelated', 'v01.9.0'], 'minor'), '1.11.0');
  assert.equal(nextVersion('2.0.1', ['v1.9.9'], 'patch'), '2.0.2');
});

test('rejects malformed versions, untrusted inputs, and unsafe arithmetic', () => {
  for (const value of ['01.2.3', '1.2', '1.2.3-beta', '1.2.3\n', '1.2.3;echo bad', null]) assert.throws(() => parseVersion(value));
  for (const bump of ['prerelease', '$(echo bad)', '', '__proto__', 'toString']) assert.throws(() => nextVersion('1.2.3', [], bump));
  assert.throws(() => nextVersion('1.2.9007199254740991', [], 'patch'));
});

test('preparing changes version metadata without changing dependencies, lockfile, or git history', t => {
  const { root, source } = fixture(t);
  assert.deepEqual(prepareVersion(root, 'minor'), { previous: '1.6.4', version: '1.7.0' });
  const manifest = JSON.parse(readFileSync(join(root, 'package.json')));
  assert.deepEqual(manifest.dependencies, { fixture: '1.0.0' });
  assert.equal(JSON.parse(readFileSync(join(root, 'docs/dory.json'))).version, '1.7.0 · Latest');
  assert.equal(readFileSync(join(root, 'pnpm-lock.yaml'), 'utf8'), 'lockfileVersion: 9.0\n');
  assert.equal(git(root, 'rev-parse', 'HEAD'), source);
});

test('commits only tested version metadata; publication uses the resulting commit', t => {
  const { root, source } = fixture(t);
  const sha = commitVersion(root, { previous: '1.6.4', version: '1.6.5', source, bump: 'patch' });
  assert.notEqual(sha, source);
  assert.equal(git(root, 'rev-parse', 'HEAD^'), source);
  assert.equal(git(root, 'log', '-1', '--format=%s'), 'chore(release): v1.6.5');
  assert.deepEqual(git(root, 'diff-tree', '--no-commit-id', '--name-only', '-r', sha).split('\n'), ['docs/dory.json', 'package.json']);
  assert.equal(git(root, 'status', '--porcelain'), '');
  assert.equal(git(root, 'ls-remote', 'origin', 'refs/heads/main').split(/\s/)[0], source, 'helper does not push implicitly');
});

test('stale main and failed-job full reruns cannot overwrite an existing version commit', t => {
  const { root, source } = fixture(t);
  const sha = commitVersion(root, { previous: '1.6.4', version: '1.6.5', source, bump: 'patch' });
  git(root, 'push', 'origin', 'HEAD:main');
  git(root, 'checkout', '--detach', source);
  assert.throws(() => commitVersion(root, { previous: '1.6.4', version: '1.6.5', source, bump: 'patch' }), /main advanced/);
  assert.equal(git(root, 'ls-remote', 'origin', 'refs/heads/main').split(/\s/)[0], sha);
  assert.equal(JSON.parse(readFileSync(join(root, 'package.json'))).version, '1.6.4');
});

test('rejects dirty checkouts, wrong source, and a mismatched version before committing', t => {
  const { root, source } = fixture(t);
  const args = { previous: '1.6.4', version: '1.6.5', source, bump: 'patch' };
  assert.throws(() => commitVersion(root, { ...args, source: '0'.repeat(40) }), /tested source/);
  assert.throws(() => commitVersion(root, { ...args, version: '9.0.0' }), /tested bump/);
  writeFileSync(join(root, 'untracked.txt'), 'local work');
  assert.throws(() => commitVersion(root, args), /clean checkout/);
  assert.equal(git(root, 'rev-parse', 'HEAD'), source);
});
