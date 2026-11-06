/*
 * Copyright 2026 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0
 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Docs use canonical UX catalog keys, independently of Dory compatibility aliases.
export function findUnknownIcons(source, catalog) {
  let fence = null;
  const issues = [];
  for (const [index, line] of source.split('\n').entries()) {
    const marker = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
      continue;
    }
    if (fence) continue;
    for (const match of line.matchAll(/\bicon\s*=\s*(?:"([^"]+)"|'([^']+)'|\{\s*"([^"]+)"\s*\}|\{\s*'([^']+)'\s*\})/g)) {
      const name = match.slice(1).find(Boolean);
      if (!catalog.has(name)) issues.push({ name, line: index + 1 });
    }
  }
  return issues;
}

function pages(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (['node_modules', 'dist', 'dist-ssr', '.dory'].includes(entry.name)) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? pages(path) : entry.name.endsWith('.mdx') ? [path] : [];
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const catalogSource = readFileSync(join(root, 'icons/index.js'), 'utf8');
  const catalog = new Set([...catalogSource.matchAll(/^\s*"([^"]+)": icon\d+/gm)].map(match => match[1]));
  if (!catalog.size) throw new Error('Cannot read the UX icon catalog');
  const files = pages(join(root, 'docs'));
  let errors = 0;
  for (const path of files) {
    for (const issue of findUnknownIcons(readFileSync(path, 'utf8'), catalog)) {
      console.error(`${relative(root, path)}:${issue.line}: Unknown Clidey UX icon: ${issue.name}`);
      errors++;
    }
  }
  if (errors) process.exitCode = 1;
  else console.log(`Validated rendered icons in ${files.length} documentation pages.`);
}
