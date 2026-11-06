/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import {existsSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export function resolveDoryCli() {
  const cli = resolve(process.env.DORY_CLI || join(root, '.dory/compiler/bin/dist/dory.js'));
  if (!existsSync(cli)) throw new Error('Run pnpm docs:setup first, or set DORY_CLI to a reviewed compiler checkout.');
  return cli;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = spawnSync(process.execPath, [resolveDoryCli(), ...process.argv.slice(2)], {cwd: join(root, 'docs'), env: process.env, stdio: 'inherit'});
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}
