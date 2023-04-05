import JSON5 from 'json5';
import type ManifestType from '../src/manifestType.ts';

if(Deno.args.length < 1) {
  console.error('Version specifier required');
  Deno.exit(1);
}

const manifestText = await Deno.readTextFile('./src/manifest.json5');
const manifest = JSON5.parse(manifestText) as ManifestType;

const manifestVersion = `v${manifest.version}`;
const cliVersion = Deno.args[0];

if(manifestVersion !== cliVersion) {
  console.error(`Version did not match: ${manifestVersion} (manifest.json5) != ${cliVersion} (${Deno.args[1] ?? 'CLI'})`);
  Deno.exit(1);
}
