/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import assert from 'node:assert/strict';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {join} from 'node:path';
import {spawn} from 'node:child_process';
import {root, resolveDoryCli} from './dory.mjs';
const docs = join(root, 'docs');
const registry = JSON.parse(await readFile(join(docs, 'examples/registry.json'), 'utf8'));
const config = JSON.parse(await readFile(join(docs, 'dory.json'), 'utf8'));
const requireDory = createRequire(resolveDoryCli());
const {chromium} = requireDory('playwright-core');
const port = 3199;
const base = `http://127.0.0.1:${port}${config.basePath || ''}/`;
const report = {pages: 0, errors: []};
const server = spawn(process.execPath, [resolveDoryCli(), 'preview'], {cwd: docs, env: {...process.env, PORT: String(port)}, stdio: 'pipe'});
let logs = '';
server.stdout.on('data', data => { logs += data; });
server.stderr.on('data', data => { logs += data; });
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(`Preview exited: ${logs}`);
    try { ready = (await fetch(base)).ok; } catch { /* Server is starting. */ }
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, `Preview did not start: ${logs}`);
  browser = await chromium.launch({channel: 'chrome', ...(process.env.DORY_CHROME_PATH ? {executablePath: process.env.DORY_CHROME_PATH} : {})});
  for (const viewport of [{width: 1440, height: 1000}, {width: 390, height: 844}]) {
    const context = await browser.newContext({viewport});
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    for (const id of Object.keys(registry)) {
      const route = `components/${id}`;
      try {
        const response = await page.goto(new URL(route + '/', base).href, {waitUntil: 'domcontentloaded'});
        assert.equal(response.status(), 200);
        const preview = page.locator('[data-dory-preview]').first();
        await preview.waitFor();
        const metrics = await preview.evaluate(element => {
          const demo = element.querySelector('[data-ux-demo], .ux-demo');
          if (!demo) return null;
          const panelStyle = getComputedStyle(element);
          const demoStyle = getComputedStyle(demo);
          return {panel: parseFloat(panelStyle.paddingLeft), demo: parseFloat(demoStyle.paddingLeft)};
        });
        assert.ok(metrics, 'Missing interactive demo');
        assert.equal(metrics.panel, 0, 'Self-padded demo received an extra preview inset');
        assert.ok(metrics.demo >= 16, 'Demo content touches its frame');
        assert.equal(await page.getByText('This page failed to render', {exact: true}).count(), 0);
        const overflow = await page.evaluate(() => ({
          fits: document.documentElement.scrollWidth <= innerWidth + 1,
          elements: [...document.querySelectorAll('article *')].filter(element => {
            const box = element.getBoundingClientRect();
            return box.width > 0 && box.right > innerWidth + 1;
          }).slice(0, 10).map(element => ({tag: element.tagName, classes: String(element.className), width: element.getBoundingClientRect().width, minWidth: getComputedStyle(element).minWidth})),
        }));
        assert.equal(overflow.fits, true, 'Page overflows: ' + JSON.stringify(overflow.elements));
        report.pages++;
      } catch (error) { report.errors.push(`${viewport.width}px ${route}: ${error.message}`); }
    }
    await context.close();
  }
} finally {
  await browser?.close();
  if (server.exitCode === null) {
    const stopped = new Promise(resolve => server.once('exit', resolve));
    server.kill('SIGTERM');
    await stopped;
  }
  await mkdir(join(root, '.dory/docs-review'), {recursive: true});
  await writeFile(join(root, '.dory/docs-review/report.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
