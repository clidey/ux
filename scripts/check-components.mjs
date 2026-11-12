/*
 * Copyright 2026 Clidey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Checks the package rules: every src/components/ui component is exported from
// src/index.ts (the package entry point) and has tests/<name>.test.tsx, and
// every source file carries the Apache 2.0 license header.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const problems = [];

const index = readFileSync(join(root, "src/index.ts"), "utf8");
for (const file of readdirSync(join(root, "src/components/ui")).filter(name => name.endsWith(".tsx"))) {
  const name = file.slice(0, -".tsx".length);
  if (!new RegExp(`from ["'](\\./|@/)components/ui/${name}["']`).test(index)) {
    problems.push(`src/components/ui/${file} is not exported from src/index.ts`);
  }
  if (!existsSync(join(root, "tests", `${name}.test.tsx`))) {
    problems.push(`src/components/ui/${file} has no tests/${name}.test.tsx`);
  }
}

const sources = dir =>
  readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sources(path);
    return /\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".d.ts") ? [path] : [];
  });
for (const path of sources(join(root, "src"))) {
  if (!readFileSync(path, "utf8").slice(0, 1000).includes("Licensed under the Apache License, Version 2.0")) {
    problems.push(`${relative(root, path)} is missing the Apache 2.0 license header`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
