import * as esbuild from 'esbuild';
import { posix } from 'posix';
import JSON5 from 'json5';
import type ManifestType from './src/manifestType.ts';
import denoConfig from './deno.json' assert { type: 'json' };
import importmap from './import_map.json' assert { type: 'json' };

import sassPlugin from 'esbuild-plugin-sass';
import { esbuildCachePlugin } from 'esbuild-cache-plugin';
import copyPlugin from 'esbuild-plugin-copy';
import resultPlugin from 'esbuild-plugin-result';
import json5Plugin from './plugins/json5.ts';
import json5ExportPlugin from './plugins/json5Export.ts';

const srcPath = 'src';
const destPath = 'dist';
const cachePath = 'cache';

const manifest = JSON5.parse(
  Deno.readTextFileSync(posix.resolve(srcPath, 'manifest.json5'))
) as ManifestType;

const contentScripts = Array.from(new Set(
  manifest['content_scripts']
    .flatMap((entry) => entry['js'] ?? [])
    .map((path) => posix.resolve(srcPath, path.replace(/\.js$/, '.ts')))
));

const contentStyleSheets = Array.from(new Set(
  manifest['content_scripts']
    .flatMap((entry) => entry['css'] ?? [])
    .map((path) => posix.resolve(srcPath, path.replace(/\.css$/, '.scss')))
));

const optionsResources = [
  manifest['options_ui']['page'],
  ...manifest['options_ui']['js'].map((path) => path.replace(/\.js$/, '.ts')),
  ...manifest['options_ui']['css'].map((path) => path.replace(/\.css$/, '.scss')),
].map((path) => posix.resolve(srcPath, path));

const config: Partial<esbuild.BuildOptions> = {
  entryPoints: [
    posix.resolve(srcPath, 'manifest.json5'),
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
    sassPlugin(),
    copyPlugin({
      baseDir: srcPath,
      baseOutDir: destPath,
      files: [
        { from: 'imgs/*', to: 'imgs/[name][ext]' },
      ]
    }),
    json5ExportPlugin({
      filePatterns: [/manifest\.json5$/],
    }),
    json5Plugin(),
    resultPlugin(),
  ],
  logOverride: {
    'unsupported-jsx-comment': 'silent',
  },
}

export default config;