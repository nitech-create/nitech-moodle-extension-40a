import * as fs from '@std/fs';
import * as path from '@std/path';

import * as esbuild from 'esbuild';

interface Option {
  targets: { value: any; filename: string }[];
}

const objectExportJSONPlugin = (option: Option): esbuild.Plugin => ({
  name: 'object-export-json-plugin',
  setup(build) {
    build.onStart(async () => {
      const writePromises: Promise<void>[] = [];

      for (const target of option.targets) {
        const content = JSON.stringify(target.value);

        writePromises.push(
          fs.ensureDir(path.dirname(target.filename))
            .then(() => Deno.writeTextFile(target.filename, content)),
        );
      }

      await Promise.all(writePromises);
    });
  },
});

export default objectExportJSONPlugin;
