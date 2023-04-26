import * as esbuild from 'esbuild';
import * as posix from 'posix';
import * as fs from 'std/fs/mod.ts';

interface Option {
  targets: { value: any, filename: string }[]
}

const objectExportJSONPlugin = (option: Option): esbuild.Plugin => ({
  name: 'object-export-json-plugin',
  setup(build) {
    build.onStart(async () => {
      const writePromises: Promise<void>[] = [];

      for(const target of option.targets) {
        const content = JSON.stringify(target.value);

        writePromises.push(fs.ensureDir(posix.dirname(target.filename))
          .then(() => Deno.writeTextFile(target.filename, content)));
      }

      await Promise.all(writePromises);
    });
  }
});

export default objectExportJSONPlugin;
