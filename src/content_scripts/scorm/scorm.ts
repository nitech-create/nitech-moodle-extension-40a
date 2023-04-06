import collapseToc from "./collapseToc.ts";

globalThis.addEventListener('load', async () => {
  await collapseToc.loader();
});
