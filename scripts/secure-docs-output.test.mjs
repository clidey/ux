/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, writeFile, readFile, rm, symlink} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {secureDocsOutput} from './secure-docs-output.mjs';
async function fixture(t) {
 const directory = await mkdtemp(join(tmpdir(), 'ux-docs-policy-'));
 t.after(() => rm(directory, {recursive: true, force: true}));
 return directory;
}
test('only permits exact inline scripts and same-origin resources', async t => {
 const directory = await fixture(t);
 const script = 'window.theme="dark";';
 await writeFile(join(directory, 'index.html'), `<html><head></head><body><script>${script}</script><script src="/ux/app.js"></script></body></html>`);
 assert.equal(await secureDocsOutput(directory), 1);
 const html = await readFile(join(directory, 'index.html'), 'utf8');
 const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]*)"/)[1];
 assert.ok(policy.includes(`'sha256-${createHash('sha256').update(script).digest('base64')}'`));
 assert.ok(policy.includes("connect-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'"));
 assert.ok(!policy.includes('unsafe-eval'));
 assert.ok(!policy.match(/script-src[^;]*unsafe-inline/));
 assert.ok(html.indexOf('Content-Security-Policy') < html.indexOf('<script'));
 await secureDocsOutput(directory);
 assert.equal((await readFile(join(directory, 'index.html'), 'utf8')).match(/Content-Security-Policy/g).length, 1);
});
test('refuses hidden output rather than publishing it', async t => {
 const directory = await fixture(t);
 await writeFile(join(directory, '.env'), 'FAKE_TEST_VALUE=1');
 await assert.rejects(secureDocsOutput(directory), /Hidden file/);
});
test('refuses symlink output, including targets outside the site', async t => {
 const directory = await fixture(t);
 await symlink(join(directory, '..'), join(directory, 'linked'));
 await assert.rejects(secureDocsOutput(directory), /Symlink/);
});
