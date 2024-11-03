import * as JSONC from "@std/jsonc";

const stream = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream());

let content = "";
for await (const chunk of stream) {
  content += chunk;
}
const manifest = JSONC.parse(content);

console.log(manifest.version);
