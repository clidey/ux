/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import {readFile,writeFile} from 'node:fs/promises';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from '@typescript/typescript6';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const registry=JSON.parse(await readFile(join(root,'docs/examples/registry.json'),'utf8'));
let stale=0;
for(const [page,{module,component}] of Object.entries(registry)){
 const source=await readFile(join(root,'docs/examples',module+'.tsx'),'utf8');
 const ast=ts.createSourceFile(module+'.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const declaration=ast.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text===component);
 if(!declaration)throw Error('Missing demo '+component);
 const nodes=[declaration];const identifiers=new Set();
 const collect=node=>{if(ts.isIdentifier(node))identifiers.add(node.text);ts.forEachChild(node,collect);};collect(declaration);
 for(const node of ast.statements)if(ts.isVariableStatement(node)&&node.declarationList.declarations.some(d=>identifiers.has(d.name.getText(ast)))){nodes.unshift(node);collect(node);}
 for(const node of ast.statements)if(ts.isFunctionDeclaration(node)&&node.name&&node!==declaration&&identifiers.has(node.name.text)){nodes.unshift(node);collect(node);}
 const imports=[];
 for(const node of ast.statements){
  if(!ts.isImportDeclaration(node)||!node.importClause)continue;
  const parts=[];
  if(node.importClause.name&&identifiers.has(node.importClause.name.text))parts.push(node.importClause.name.text);
  const bindings=node.importClause.namedBindings;
  if(bindings&&ts.isNamespaceImport(bindings)&&identifiers.has(bindings.name.text))parts.push('* as '+bindings.name.text);
  if(bindings&&ts.isNamedImports(bindings)){const names=bindings.elements.filter(x=>identifiers.has(x.name.text)).map(x=>x.getText(ast));if(names.length)parts.push('{ '+names.join(', ')+' }');}
  if(parts.length)imports.push(`import ${parts.join(', ')} from ${node.moduleSpecifier.getText(ast)};`);
 }
 const code=imports.join('\n')+'\n\n'+nodes.map(n=>n.getText(ast)).join('\n\n');
 const filename=join(root,'docs/components',page+'.mdx');const mdx=await readFile(filename,'utf8');
 const marker=mdx.indexOf('<Specimen ');const start=mdx.indexOf('```tsx\n',marker);const end=mdx.indexOf('\n```',start+7);
 if(marker<0||start<0||end<0)throw Error('Missing source panel for '+page);
 const expected=mdx.slice(0,start+7)+code+mdx.slice(end);
 if(mdx!==expected){stale++;if(process.argv.includes('--write'))await writeFile(filename,expected);else console.error(`Stale example source: ${page}. Run pnpm docs:sync.`);}
}
if(stale&&!process.argv.includes('--write'))process.exitCode=1;
else console.log(`${process.argv.includes('--write')?'Synchronized':'Verified'} ${Object.keys(registry).length} demo source panels.`);
