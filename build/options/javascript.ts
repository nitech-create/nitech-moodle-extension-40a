import * as esbuild from 'esbuild';
import { denoPlugins } from 'esbuild-deno-loader';

type BuildOptionsOptions = {
  entryPoints: esbuild.BuildOptions['entryPoints'];
  srcPath: string;
  destPath: string;
  dev: boolean;
  jsxFactory?: string;
  jsxFragmentFactory?: string;
};

export const buildOptions = (
  options: BuildOptionsOptions,
): esbuild.BuildOptions => ({
  entryPoints: options.entryPoints,
  outdir: options.destPath,
  platform: 'browser',
  bundle: true,
  sourcemap: options.dev ? 'linked' : false,
  minify: !options.dev,
  jsxFactory: options.jsxFactory,
  jsxFragment: options.jsxFragmentFactory,
  plugins: [
    ...denoPlugins(),
  ],
});
