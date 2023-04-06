import * as semver from "std/semver/mod.ts";
import JSON5 from 'json5';
import type ManifestType from '../src/manifestType.ts';

const apiEndPoint = 'https://api.github.com/repos/nitech-create/nitech-moodle-extension-40a/releases/latest';

const manifestText = await Deno.readTextFile('./src/manifest.json5');
const manifest = JSON5.parse(manifestText) as ManifestType;

const currentVer = semver.valid(manifest.version);
if(currentVer === null) {
  console.error(`[Fail] The version ${manifest.version} is not a valid semver version`);
  Deno.exit(1);
}

const res = await fetch(apiEndPoint);
if(!res.ok) {
  console.error(`[Fail] Failed to fetch remote version information from ${apiEndPoint}`);
  Deno.exit(1);
}

const latestReleaseVerStr = JSON.parse(await res.text())["tag_name"];
if(typeof latestReleaseVerStr !== 'string') {
  console.log('[Fail] No release found.');
  Deno.exit(1);
}

const latestReleaseVer = semver.valid(latestReleaseVerStr);
if(latestReleaseVer === null) {
  console.error(`[Fail] The remote release version ${latestReleaseVerStr} is not a valid semver version (${latestReleaseVerStr})`);
  Deno.exit(1);
}

if(semver.lte(currentVer, latestReleaseVer)) {
  console.error(`[Fail] The version ${manifest.version} is smaller or equals to latest release version`);
  Deno.exit(1);
}
