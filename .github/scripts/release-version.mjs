import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const stable = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const git = (root, ...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const read = (file) => JSON.parse(readFileSync(file, 'utf8'));
const write = (file, value) => writeFileSync(file, JSON.stringify(value, null, 2) + '\n');

export function parseVersion(version) {
  if (typeof version !== 'string' || (!stable.test(version) || version.trim() !== version)) throw new Error('Expected a stable X.Y.Z version.');
  const parts = version.split('.').map(Number);
  if (parts.some((part) => !Number.isSafeInteger(part))) throw new Error('Version exceeds safe integer limits.');
  return parts;
}

export function nextVersion(current, tags, bump) {
  if (!['major', 'minor', 'patch'].includes(bump)) throw new Error('Choose patch, minor, or major.');
  const index = { major: 0, minor: 1, patch: 2 }[bump];
  let parts = parseVersion(current);
  for (const tag of tags) {
    if (!tag.startsWith('v') || !stable.test(tag.slice(1))) continue;
    const candidate = parseVersion(tag.slice(1));
    const difference = candidate.findIndex((part, i) => part !== parts[i]);
    if (difference >= 0 && candidate[difference] > parts[difference]) parts = candidate;
  }
  parts[index] += 1;
  parts.fill(0, index + 1);
  const result = parts.join('.');
  parseVersion(result);
  return result;
}

export function writeVersion(root, version) {
  parseVersion(version);
  const packageFile = resolve(root, 'package.json');
  const packageJson = read(packageFile);
  const docsFile = resolve(root, 'docs/dory.json');
  const docs = read(docsFile);
  // Keep any display suffix while updating the leading stable version.
  if (typeof docs.version !== 'string' || !/^\d+\.\d+\.\d+(?:\s|$)/.test(docs.version)) {
    throw new Error('Expected the documentation display version to start with X.Y.Z.');
  }
  docs.version = docs.version.replace(/^\d+\.\d+\.\d+/, version);
  packageJson.version = version;
  write(packageFile, packageJson);
  write(docsFile, docs);
}

export function prepareVersion(root, bump) {
  const previous = read(resolve(root, 'package.json')).version;
  const tags = git(root, 'tag', '--list', 'v*').split('\n');
  const version = nextVersion(previous, tags, bump);
  writeVersion(root, version);
  return { previous, version };
}

export function commitVersion(root, { version, previous, source, bump }) {
  parseVersion(version);
  parseVersion(previous);
  if (!/^[a-f0-9]{40}$/.test(source || '')) throw new Error('Expected the dispatch commit SHA.');
  if (git(root, 'status', '--porcelain')) throw new Error('Version commit requires a clean checkout.');
  if (git(root, 'rev-parse', 'HEAD') !== source) throw new Error('Checkout does not match the tested source.');
  git(root, 'fetch', 'origin', 'refs/heads/main:refs/remotes/origin/main');
  if (git(root, 'rev-parse', 'origin/main') !== source) {
    throw new Error('main advanced during validation. Start a new release from current main.');
  }
  if (read(resolve(root, 'package.json')).version !== previous) throw new Error('The source version changed.');
  const expected = nextVersion(previous, git(root, 'tag', '--list', 'v*').split('\n'), bump);
  if (version !== expected) throw new Error('The release version does not match the tested bump.');
  writeVersion(root, version);
  git(root, 'config', 'user.name', 'github-actions[bot]');
  git(root, 'config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com');
  git(root, 'add', '--', 'package.json', 'docs/dory.json');
  git(root, 'commit', '-m', `chore(release): v${version}`);
  return git(root, 'rev-parse', 'HEAD');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.env.GITHUB_REF !== 'refs/heads/main') throw new Error('Releases run only from main.');
  const root = process.cwd();
  const output = (name, value) => appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
  if (process.argv[2] === 'prepare') {
    const { previous, version } = prepareVersion(root, process.env.RELEASE_BUMP);
    output('previous', previous);
    output('version', version);
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `Release: ${previous} → ${version} (${process.env.RELEASE_BUMP})\n`);
  } else if (process.argv[2] === 'commit') {
    const sha = commitVersion(root, {
      version: process.env.RELEASE_VERSION,
      previous: process.env.PREVIOUS_VERSION,
      source: process.env.SOURCE_SHA,
      bump: process.env.RELEASE_BUMP,
    });
    output('sha', sha);
  } else throw new Error('Choose prepare or commit.');
}
