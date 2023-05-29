import * as esbuild from 'esbuild';
import { Command } from "cliffy";
import { readLines } from "std/io/mod.ts";
import config from './buildOptions.ts';

const { options, args } = await new Command()
  .option('-d, --dev', 'development mode')
  .option('-w, --watch', 'watch mode (development only)')
  .parse(Deno.args);

const ctx = await esbuild.context(config(options.dev === true));

if(options.dev && options.watch) {
  await ctx.watch();
  console.log('Watching...');

  for await(const _ of readLines(Deno.stdin)) {
    // manually rebuild
    await ctx.rebuild().catch(() => {});
  }
} else {
  // just build
  await ctx.rebuild();
}

esbuild.stop();
