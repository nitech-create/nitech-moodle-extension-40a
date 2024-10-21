import * as path from '@std/path';

import * as esbuild from 'esbuild';
import JSON5 from 'json5';
import type ManifestType from './src/manifestType.ts';
import denoConfig from './deno.json' with { type: 'json' };
import importmap from './import_map.json' with { type: 'json' };

import sassPlugin from 'esbuild-plugin-sass';
import { esbuildCachePlugin } from 'esbuild-cache-plugin';
import copyPlugin from 'esbuild-plugin-copy';
import resultPlugin from 'esbuild-plugin-result';
import objectExportJSONPlugin from './plugins/objectExportJSON.ts';

const srcPath = 'src';
const destPath = 'dist';
const cachePath = 'cache';

const manifest = JSON5.parse(
  Deno.readTextFileSync(path.resolve(srcPath, 'manifest.json5')),
) as ManifestType;

const contentScripts = Array.from(
  new Set(
    manifest['content_scripts']
      .flatMap((entry) => entry['js'] ?? [])
      .map((file) => path.resolve(srcPath, file.replace(/\.js$/, '.ts'))),
  ),
);

const contentStyleSheets = Array.from(
  new Set(
    manifest['content_scripts']
      .flatMap((entry) => entry['css'] ?? [])
      .map((file) => path.resolve(srcPath, file.replace(/\.css$/, '.scss'))),
  ),
);

const optionsResources = [
  manifest['options_ui']['page'],
  ...(manifest['options_ui']['js'] ?? []).map((path) =>
    path.replace(/\.js$/, '.ts')
  ),
  ...(manifest['options_ui']['css'] ?? []).map((path) =>
    path.replace(/\.css$/, '.scss')
  ),
].map((file) => path.resolve(srcPath, file));

// Reflect.deleteProperty と違って Typescript の型チェックが効く
delete manifest.options_ui.js;
delete manifest.options_ui.css;

const config: Partial<esbuild.BuildOptions> = (dev = false) => ({
  entryPoints: [
    ...contentScripts,
    ...contentStyleSheets,
    ...optionsResources,
  ],
  bundle: true,
  outdir: destPath,
  platform: 'browser',
  loader: {
    '.html': 'copy',
  },
  jsxFactory: denoConfig.compilerOptions.jsxFactory,
  jsxFragment: denoConfig.compilerOptions.jsxFragmentFactory,
  plugins: [
    esbuildCachePlugin({
      directory: cachePath,
      importmap,
    }),
    objectExportJSONPlugin({
      targets: [
        { value: manifest, filename: path.resolve(destPath, 'manifest.json') },
      ],
    }),
    sassPlugin(),
    copyPlugin({
      baseDir: srcPath,
      baseOutDir: destPath,
      files: [
        { from: 'imgs/*', to: 'imgs/[name][ext]' },
      ],
    }),
    resultPlugin(),
  ],
  logOverride: {
    'unsupported-jsx-comment': 'silent',
  },
  sourcemap: dev ? 'inline' : 'linked',
});

export default config;
