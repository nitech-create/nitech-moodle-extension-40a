import * as esbuild from 'esbuild';
import { posix } from 'posix';
import sassPlugin from 'esbuild-plugin-sass';
import { esbuildCachePlugin } from 'esbuild-cache-plugin';
import copyPlugin from 'esbuild-plugin-copy';
import resultPlugin from 'esbuild-plugin-result';
import json5Plugin from './plugins/json5.ts';
import json5ExportPlugin from './plugins/json5Export.ts';
import JSON5 from 'json5';
import type ManifestType from './src/manifestType.ts';

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

const config: Partial<esbuild.BuildOptions> = {
  entryPoints: [
    posix.resolve(srcPath, 'manifest.json5'),
    ...contentScripts,
    ...contentStyleSheets
  ],
  bundle: true,
  outdir: destPath,
  platform: 'browser',
  loader: {
  },
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  plugins: [
    esbuildCachePlugin({
      directory: cachePath
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
}

export default config;