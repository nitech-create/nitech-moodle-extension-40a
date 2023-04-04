import * as esbuild from 'esbuild';
import { posix } from 'posix';
import sassPlugin from 'esbuild-plugin-sass';
import { esbuildCachePlugin } from 'esbuild-cache-plugin';
import copyPlugin from 'esbuild-plugin-copy';
import resultPlugin from 'esbuild-plugin-result';
import json5Plugin from './plugins/json5.ts';
import json5ExportPlugin from './plugins/json5Export.ts';

const srcPath = 'src';
const destPath = 'dist';
const cachePath = 'cache';

const config: Partial<esbuild.BuildOptions> = {
  entryPoints: [
    posix.join(srcPath, 'manifest.json5'),
  ],
  bundle: true,
  outdir: destPath,
  platform: 'browser',
  loader: {
  },
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