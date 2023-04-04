import * as esbuild from 'esbuild';
import JSON5 from 'json5';

interface Options {
  filePatterns: RegExp[],
}
const namespace = 'json5-export';

const json5ExportPlugin = (options?: Options): esbuild.Plugin => ({
  name: 'json5-export',
  setup(build) {
    const patterns = options?.filePatterns ?? [];
    for(const pattern of patterns) {
      build.onResolve({ filter: pattern }, (args) => ({
        path: args.path.replace(/\.json5$/, '.json'),
        namespace,
        pluginData: {
          originalPath: args.path
        }
      }));
    }

  build.onLoad({ filter: /.*/, namespace }, async (args) => {
      const json5Content = await Deno.readTextFile(args.pluginData.originalPath);
      const jsonContent = JSON.stringify(JSON5.parse(json5Content));

      return {
        contents: jsonContent,
        loader: 'copy',
      };
    });
  }
});

export default json5ExportPlugin;
