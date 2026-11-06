/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import ts from '@typescript/typescript6';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docs = join(root, 'docs');
const output = join(docs, 'dist');
const config = JSON.parse(await readFile(join(docs, 'dory.json'), 'utf8'));
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const origin = `${config.url.replace(/\/$/, '')}${config.basePath ?? ''}`;
const generated = spawnSync(process.execPath, [join(root, 'scripts/build-icon-components.mjs')], { cwd: root, encoding: 'utf8' });
if (generated.status !== 0) throw new Error(generated.stderr || 'Could not generate icon exports');

// Emit fresh contracts in memory, leaving the library build output untouched.
const parsed = ts.getParsedCommandLineOfConfigFile(join(root, 'tsconfig.lib.json'), {}, {
  ...ts.sys, onUnRecoverableConfigFileDiagnostic: diagnostic => { throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')); },
});
if (!parsed) throw new Error('Could not read library TypeScript configuration');
const typeRoot = join(root, '.dory/agent-types');
const program = ts.createProgram(parsed.fileNames, { ...parsed.options, declaration: true, declarationMap: false, emitDeclarationOnly: true, noEmit: false, outDir: typeRoot });
const diagnostics = ts.getPreEmitDiagnostics(program).filter(item => item.category === ts.DiagnosticCategory.Error);
if (diagnostics.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCanonicalFileName: file => file, getCurrentDirectory: () => root, getNewLine: () => '\n' }));
const declarations = new Map();
program.emit(undefined, (file, text) => {
  if (file.endsWith('.d.ts') && !file.endsWith('/catalog-icons.d.ts')) declarations.set(relative(typeRoot, file), text.trim());
});
const entry = program.getSourceFile(join(root, 'src/index.ts'));
const checker = program.getTypeChecker();
const symbol = entry && checker.getSymbolAtLocation(entry);
if (!symbol || !declarations.size) throw new Error('Cannot inspect public UX exports and contracts');
const exports = checker.getExportsOfModule(symbol).map(item => item.name).sort();
const catalogSource = await readFile(join(root, 'icons/index.js'), 'utf8');
const icons = [...catalogSource.matchAll(/^\s*"([^"]+)": icon\d+/gm)].map(match => match[1]);
if (!icons.length) throw new Error('Cannot read UX icon catalog');
const iconComponent = name => 'Icon' + name.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('');
const themeSource = program.getSourceFile(join(root, 'src/themes/index.ts'));
function literal(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).filter(prop => !['css', 'previewStyle'].includes(prop.name.getText(themeSource))).map(prop => [prop.name.getText(themeSource).replace(/['"]/g, ''), literal(prop.initializer)]));
  return undefined;
}
let palettes = [];
for (const statement of themeSource.statements) {
  if (!ts.isVariableStatement(statement)) continue;
  for (const declaration of statement.declarationList.declarations) if (declaration.name.getText(themeSource) === 'themes' && declaration.initializer) palettes = literal(declaration.initializer);
}
if (!palettes.length) throw new Error('Cannot read UX palettes');
const tokens = new Set();
for (const filename of await readdir(join(root, 'src/themes/css'))) {
  if (!filename.endsWith('.css')) continue;
  for (const match of (await readFile(join(root, 'src/themes/css', filename), 'utf8')).matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)) tokens.add(match[1]);
}
async function walk(directory) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'dist-ssr'].includes(item.name) || item.name.startsWith('.')) continue;
    const path = join(directory, item.name);
    if (item.isDirectory()) files.push(...await walk(path));
    else if (/\.(tsx|css|json)$/.test(item.name)) files.push(path);
  }
  return files;
}
let index = await readFile(join(output, 'llms.txt'), 'utf8');
let guide = await readFile(join(output, 'llms-full.txt'), 'utf8');
if (index.startsWith('# Clidey UX: complete application-building context')) {
  index = await readFile(join(output, 'llms-index.txt'), 'utf8');
  guide = await readFile(join(output, 'llms-pages.txt'), 'utf8');
}
if (!guide.includes('ThemeProvider') || !guide.includes('components/button.mdx')) throw new Error('Build Dory documentation before generating agent context');
const fence = (language, text) => `\n\n\`\`\`\`${language}\n${text}\n\`\`\`\`\n`;
const parts = [
  `# Clidey UX: complete application-building context\n\nPackage: @clidey/ux ${pkg.version}\nDocumentation: ${origin}\n\nThis file contains setup, complete documentation, current public TypeScript contracts, all ${palettes.length} palettes, all ${icons.length} icon names, and complete working example source. Read through END OF CLIDEY UX BUILD CONTEXT. This is documentation; reading its URL does not install an MCP server.`,
  `## Build instructions\n\nBuild the application described by the user in their current workspace. Inspect the existing framework, package manager, and project structure first, and preserve the application's conventions. Install @clidey/ux; React and React DOM ${pkg.peerDependencies.react} are peers. Import @clidey/ux/styles.css once, use ThemeProvider with defaultPalette="paper-ink", and support light/dark/system mode. The optional @clidey/ux/theme-fonts.css provides self-hosted palette fonts.\n\nMount Toaster once at the application root when using notifications. Use UX components and named catalog icons; do not add direct lucide-react imports. Use semantic tokens, labeled fields, keyboard access, responsive layouts, real state, loading/empty/error states, and the existing application's conventions. Keep business logic and data access in the application. Complete the implementation, run relevant checks, launch it locally, and inspect the actual browser experience. Show the user the app and any remaining limitations. Do not commit, push, publish, or deploy without explicit approval.\n\nThe contracts are reference material, not source files to recreate. If a tool truncates this response, download the entire file and read it in sections until the end marker. No API key is required to read it.`,
  '## Documentation index\n\n' + index,
  '## Complete documentation\n\n' + guide,
  '## Complete icon catalog\n\nUse CatalogIcon with a validated name or a named React export. Icons accept SVG props, refs, and size; they inherit currentColor. Never guess names.\n\n| Catalog name | React export |\n| --- | --- |\n' + icons.map(name => `| ${name} | ${iconComponent(name)} |`).join('\n'),
  '## Complete palette catalog\n\nUse themes, getThemeById, and useTheme().setPalette(id). Mode and palette are independent; defaults respect stored choices. Import palette styles rather than recreating them.\n' + fence('json', JSON.stringify(palettes, null, 2)),
  '## Semantic token names\n\n' + [...tokens].sort().map(name => `- ${name}`).join('\n'),
  '## Public exports\n\n' + exports.join(', '),
  '## Public TypeScript contracts\n\nExternal types come from the installed dependencies. Named catalog icons share CatalogIconProps; the table above replaces their repeated declarations.',
];
for (const [name, text] of [...declarations].sort(([a], [b]) => a.localeCompare(b))) parts.push(`### ${name}` + fence('ts', text));
parts.push('## Complete working example source\n\nAll data is fictional and actions are local. Documentation wrappers and styles are included. Adapt these to product behavior rather than copying documentation navigation.');
for (const directory of [join(docs, 'examples'), join(root, 'examples/workspace')]) for (const file of (await walk(directory)).sort()) parts.push(`### ${relative(root, file)}` + fence(file.endsWith('.css') ? 'css' : file.endsWith('.json') ? 'json' : 'tsx', await readFile(file, 'utf8')));
parts.push('END OF CLIDEY UX BUILD CONTEXT');
parts.splice(1, 0, '## Copyable app-building prompt' + fence('text', (await readFile(join(docs, 'ai/starter-prompt.txt'), 'utf8')).replace('{{CONTEXT_URL}}', origin + '/llms.txt')));
const context = parts.join('\n\n') + '\n';
await writeFile(join(output, 'llms-index.txt'), index);
await writeFile(join(output, 'llms-pages.txt'), guide);
await Promise.all(['llms.txt', 'llms-full.txt'].map(name => writeFile(join(output, name), context)));
console.log(`Built complete agent context: ${Buffer.byteLength(context)} bytes, ${icons.length} icons, ${palettes.length} palettes, ${declarations.size} contract files.`);
