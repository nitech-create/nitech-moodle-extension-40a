import * as esbuild from 'esbuild';
import * as fs from '@std/fs';
import * as JSONC from '@std/jsonc';
import * as path from '@std/path';

import { Manifest } from './manifest.ts';
import { buildOptions as jsBuildOptions } from './options/javascript.ts';
import { buildOptions as cssBuildOptions } from './options/stylesheet.ts';
import { buildOptions as copyBuildOptions } from './options/copy.ts';

const dev = true;

const srcPath = './src';
const destPath = './dist';

const denoConfigFilePath = path.resolve('deno.json');
const manifestFilePath = path.resolve(srcPath, 'manifest.jsonc');

const denoConfig = JSONC.parse(await Deno.readTextFile(denoConfigFilePath));
const manifest = Manifest.parse(await Deno.readTextFile(manifestFilePath));

const removeExtension = function (name: string) {
  return name.slice(0, -path.extname(name).length);
};

const jsEntryPointsRaw = manifest.getScripts().map((filename) => ({
  in: filename,
  out: `${removeExtension(filename)}.js`,
}));
const cssEntryPointsRaw = manifest.getStylesheets().map((filename) => ({
  in: filename,
  out: `${removeExtension(filename)}.css`,
}));
const jsEntryPoints = jsEntryPointsRaw.map((entry) => ({
  in: path.resolve(srcPath, entry.in),
  out: path.resolve(destPath, removeExtension(entry.out)),
}));
const cssEntryPoints = cssEntryPointsRaw.map((entry) => ({
  in: path.resolve(srcPath, entry.in),
  out: path.resolve(destPath, removeExtension(entry.out)),
}));
const copyEntryPoints = manifest.getFilesToCopy().map((filename) => ({
  in: path.resolve(srcPath, filename),
  out: path.resolve(destPath, removeExtension(filename)),
}));

const resourceReplacementMap = new Map<string, string>();
for (const entry of jsEntryPointsRaw) {
  resourceReplacementMap.set(entry.in, entry.out);
}
for (const entry of cssEntryPointsRaw) {
  resourceReplacementMap.set(entry.in, entry.out);
}
const newManifest = manifest.resourceFileReplaced(resourceReplacementMap);

const buildOptions = [
  jsBuildOptions({
    entryPoints: jsEntryPoints,
    srcPath,
    destPath,
    dev,
    jsxFactory: denoConfig.jsxFactory,
    jsxFragmentFactory: denoConfig.jsxFragmentFactory,
  }),
  cssBuildOptions({
    entryPoints: cssEntryPoints,
    srcPath,
    destPath,
    dev,
  }),
  copyBuildOptions({
    entryPoints: copyEntryPoints,
    srcPath,
    destPath,
    loaderExts: ['.html'],
  }),
];

await fs.ensureDir(destPath);
await Promise.all([
  ...buildOptions.map((buildOptions) => {
    return esbuild.build(buildOptions);
  }),
  Deno.writeTextFile(
    path.resolve(destPath, 'manifest.json'),
    newManifest.stringify(),
  ),
]);
