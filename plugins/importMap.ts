import * as esbuild from 'esbuild';
import { posix } from 'posix';

interface ImportMap {
  imports?: { [key: string]: string },
  scope?: {
    [key: string]: { [key: string]: string }
  },
}

interface Options {
  importMap:ImportMap,
}

const importMapPlugin = (options: Options): esbuild.Plugin => {
  const imports = options.importMap.imports ?? {};
  const scope = options.importMap.scope ?? {};

  return {
    name: 'import-map',
    setup(build) {
      build.onResolve({ filter: /^[^\./]/ }, async (args) => {
        if(posix.isAbsolute(args.path)) {
          return args;
        }

        for(const scopePath in scope) {
          if(!posix.relative(scopePath, args.importer).startsWith('..')) {
            if(args.path in scope[scopePath]) {
              const result = await build.resolve(scope[scopePath][args.path], {
                kind: args.kind
              });

              return {
                path: result.path,
              };
            }
          }
        }

        if(args.path in imports) {
          const result = await build.resolve(imports[args.path], {
            kind: args.kind
          });

          return result;
        }
      });
    },
  }
}

export default importMapPlugin;
