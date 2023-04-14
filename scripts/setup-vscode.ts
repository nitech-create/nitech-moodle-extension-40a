const configFilePath = './.vscode/settings.json';
const configJSON = await (async () => {
  try {
    const stat = await Deno.lstat(configFilePath);
    const a = 2;
    if (stat.isFile) {
      return Deno.readTextFile(configFilePath);
    }

    return Promise.reject(`${configFilePath} exists but is NOT a file`);
  } catch {
    return '{}';
  }
})();

const config = JSON.parse(configJSON);
const langSettings = {
  'editor.defaultFormatter': 'denoland.vscode-deno',
  'editor.tabSize': 2,
  'editor.insertSpaces': true,
};

config['deno.enable'] = true;
config['deno.unstable'] = true;
config['deno.lint'] = true;
config['deno.config'] = './deno.json';
config['deno.importMap'] = './import_map.json';
config['[javascript]'] = langSettings;
config['[javascriptreact]'] = langSettings;
config['[typescript]'] = langSettings;
config['[typescriptreact]'] = langSettings;
config['[json]'] = langSettings;

await Deno.writeTextFile(configFilePath, JSON.stringify(config));

const p = Deno.run({
  cmd: ['deno', 'fmt', configFilePath],
});
const status = await p.status();

Deno.exit(status.code);
