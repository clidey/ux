/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registry = JSON.parse(await readFile(join(root, 'docs/examples/registry.json'), 'utf8'));
const pages = (await readdir(join(root, 'docs/components'))).filter(name => name.endsWith('.mdx') && name !== 'overview.mdx').map(name => name.slice(0, -4)).sort();
if (JSON.stringify(pages) !== JSON.stringify(Object.keys(registry).sort())) throw new Error('Every component reference must have exactly one registered live demo');
for (const page of pages) {
  const { module, component } = registry[page];
  if (!/^[a-z-]+$/.test(module) || !/^[A-Z][A-Za-z]+$/.test(component)) throw new Error(`Invalid demo registration for ${page}`);
  const source = await readFile(join(root, 'docs/examples', module + '.tsx'), 'utf8');
  const mdx = await readFile(join(root, 'docs/components', page + '.mdx'), 'utf8');
  if (!source.includes(`export function ${component}(`)) throw new Error(`Missing exported demo ${component}`);
  if (!mdx.includes(`import { ${component} } from '../examples/${module}.tsx';`) || !mdx.includes(`<${component} />`) || !mdx.includes('<Specimen ') || !mdx.includes('```tsx')) throw new Error(`Missing live preview or source panel for ${page}`);
}
console.log(`Verified live preview and source coverage for all ${pages.length} component references.`);
