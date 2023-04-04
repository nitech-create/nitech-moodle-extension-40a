import * as esbuild from 'esbuild';
import JSON5 from 'json5';

const json5Plugin = (loader?: esbuild.Loader): esbuild.Plugin => ({
  name: 'json5-plugin',
  setup(build) {
    build.onLoad({ filter: /\.json5$/ }, async (args) => {
      const json5Content = await Deno.readTextFile(args.path);
      const jsonContent = JSON.stringify(JSON5.parse(json5Content));

      return {
        contents: jsonContent,
        loader: loader ?? 'json',
      };
    });
  }
});

export default json5Plugin;
