/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import {existsSync, mkdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {root} from './dory.mjs';
const config = JSON.parse(readFileSync(join(root, 'docs/compiler.json'), 'utf8'));
if (config.repository !== 'https://github.com/clidey/dory.git' || !/^[a-f0-9]{40}$/.test(config.revision)) throw new Error('Invalid compiler source pin');
const directory = join(root, '.dory/compiler');
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, {cwd, stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Documentation setup failed: ${command}`);
}
if (!existsSync(directory)) {
  mkdirSync(join(root, '.dory'), {recursive: true});
  mkdirSync(directory);
  run('git', ['init'], directory);
  run('git', ['remote', 'add', 'origin', config.repository], directory);
  run('git', ['fetch', '--depth=1', 'origin', config.revision], directory);
  run('git', ['checkout', '--detach', config.revision], directory);
}
const revision = spawnSync('git', ['rev-parse', 'HEAD'], {cwd: directory, encoding: 'utf8'});
const changes = spawnSync('git', ['status', '--porcelain'], {cwd: directory, encoding: 'utf8'});
if (revision.status !== 0 || revision.stdout.trim() !== config.revision || changes.status !== 0 || changes.stdout.trim()) throw new Error('The compiler checkout differs from the pin or has local edits. Review it before replacing it.');
run('pnpm', ['install', '--frozen-lockfile', '--ignore-scripts'], directory);
run('pnpm', ['run', 'build:cli'], directory);
