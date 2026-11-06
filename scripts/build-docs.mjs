/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import {existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {resolveDoryCli} from './dory.mjs';
import {spawnSync} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const docs=join(root,'docs');
const run=(file,args,cwd=root,env=process.env)=>{
 const result=spawnSync(process.execPath,[file,...args],{cwd,env,stdio:'inherit'});
 if(result.status!==0)throw new Error(`Documentation build step failed: ${file}`);
};
const cli=resolveDoryCli();
const probe=spawnSync(process.execPath,[cli,'capabilities'],{cwd:docs,encoding:'utf8'});
let capabilities;
try{capabilities=JSON.parse(probe.stdout);}catch{throw new Error('This documentation requires Dory native JSX components and local package overrides. Set DORY_CLI to the reviewed local compiler until that Dory release is pinned.');}
if(!capabilities.customComponents||!capabilities.packageOverrides)throw new Error('The selected Dory compiler does not support the required documentation features.');
run(join(root,'scripts/check-doc-icons.mjs'),[]);
run(join(root,'scripts/check-doc-demos.mjs'),[]);
run(join(root,'scripts/sync-doc-examples.mjs'),[]);
run(join(root,'scripts/build-icon-components.mjs'),[]);

// Build the actual library being documented, without replacing root dist/.
const stage=join(root,'.dory/docs-ux-package');
rmSync(stage,{recursive:true,force:true});mkdirSync(stage,{recursive:true});
run(join(root,'node_modules/vite/bin/vite.js'),['build','--config','vite.lib.config.ts','--outDir',join(stage,'dist')]);
const manifest=JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
writeFileSync(join(stage,'package.json'),JSON.stringify(manifest,null,2)+'\n');
for(const directory of ['icons','themes'])symlinkSync(join(root,directory),join(stage,directory),'dir');
if(!existsSync(join(stage,'dist/index.js')))throw new Error('Local documentation package was not built');
const overrides={...JSON.parse(process.env.DORY_PACKAGE_OVERRIDES??'{}'),'@clidey/ux':stage};
run(cli,['build'],docs,{...process.env,DORY_PACKAGE_OVERRIDES:JSON.stringify(overrides)});
run(join(root,'scripts/build-agent-context.mjs'),[]);
run(join(root,'scripts/secure-docs-output.mjs'),[]);
