import * as semver from "std/semver/mod.ts";
import JSON5 from 'json5';
import type ManifestType from '../src/manifestType.ts';

const apiEndPoint = 'https://api.github.com/repos/nitech-create/nitech-moodle-extension-40a/releases/latest';

const manifestText = await Deno.readTextFile('./src/manifest.json5');
const manifest = JSON5.parse(manifestText) as ManifestType;

const currentVer = semver.valid(manifest.version);
if(currentVer === null) {
  throw Error(`The version ${manifest.version} is not a valid semver version`);
}

const res = await fetch(apiEndPoint);
if(!res.ok) {
  throw Error(`Failed to fetch remote version information from ${apiEndPoint}`);
}

const latestReleaseVerStr = JSON.parse(await res.text())["tag_name"];
if(typeof latestReleaseVerStr !== 'string') {
  console.log('No release found.');
  Deno.exit();
}

const latestReleaseVer = semver.valid(latestReleaseVerStr);
if(latestReleaseVer === null) {
  throw Error(`The remote release version ${latestReleaseVerStr} is not a valid semver version (${latestReleaseVerStr})`);
}

if(semver.lte(currentVer, latestReleaseVer)) {
  throw Error(`The version ${manifest.version} is smaller or equals to latest release version`);
}
