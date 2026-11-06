/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import {createHash} from 'node:crypto';
import {readdir, readFile, writeFile, lstat} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {root} from './dory.mjs';
export async function secureDocsOutput(outputDirectory) {
  let pages = 0;
  async function secure(directory) {
    for (const name of await readdir(directory)) {
      if (name.startsWith('.')) throw new Error(`Hidden file in public output: ${name}`);
      const file = join(directory, name);
      const info = await lstat(file);
      if (info.isSymbolicLink()) throw new Error(`Symlink in public output: ${file}`);
      if (info.isDirectory()) { await secure(file); continue; }
      if (!name.endsWith('.html')) continue;
      let html = await readFile(file, 'utf8');
      html = html.replace(/<meta data-ux-security[^>]*>/g, '');
      const hashes = [];
      for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (!/\bsrc\s*=/i.test(match[1])) hashes.push(`'sha256-${createHash('sha256').update(match[2]).digest('base64')}'`);
      }
      const policy = `default-src 'self'; script-src 'self' ${hashes.join(' ')}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'`;
      const meta = `<meta data-ux-security http-equiv="Content-Security-Policy" content="${policy}"><meta name="referrer" content="strict-origin-when-cross-origin">`;
      html = html.replace(/<head([^>]*)>/i, `<head$1>${meta}`);
      await writeFile(file, html);
      pages++;
    }
  }
  await secure(outputDirectory);
  return pages;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const pages = await secureDocsOutput(join(root, 'docs/dist'));
  console.log(`Secured ${pages} HTML pages with hashed scripts and same-origin resource policies.`);
}
