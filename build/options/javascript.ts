import * as esbuild from 'esbuild';
import { denoPlugins } from 'esbuild-deno-loader';
import { debugSwitchPlugin } from 'esbuild-plugin-debug-switch/plugin';

type BuildOptionsOptions = {
  entryPoints: esbuild.BuildOptions['entryPoints'];
  srcPath: string;
  destPath: string;
  dev: boolean;
  jsxFactory?: string;
  jsxFragmentFactory?: string;
  extensionName: string;
  extensionVersion: string;
};

export const buildOptions = (
  options: BuildOptionsOptions,
): esbuild.BuildOptions => ({
  entryPoints: options.entryPoints,
  outdir: options.destPath,
  platform: 'browser',
  format: 'esm',
  bundle: true,
  splitting: true,
  sourcemap: options.dev ? 'linked' : false,
  minify: !options.dev,
  jsxFactory: options.jsxFactory,
  jsxFragment: options.jsxFragmentFactory,
  plugins: [
    debugSwitchPlugin({
      isDebug: options.dev,
      env: {
        extensionName: options.extensionName,
        extensionVersion: options.extensionVersion,
      },
    }),
    ...denoPlugins(),
  ],
});
