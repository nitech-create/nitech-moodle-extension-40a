import * as esbuild from 'esbuild';
import { Command } from 'cliffy';
import config from './buildOptions.ts';

const { options, args } = await new Command()
  .option('-d, --dev', 'development mode')
  .option('-w, --watch', 'watch mode (development only)')
  .parse(Deno.args);

const ctx = await esbuild.context(config(options.dev === true));

// TODO: implement watch mode
await ctx.rebuild();

await esbuild.stop();
