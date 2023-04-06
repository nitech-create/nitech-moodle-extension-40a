import removeForceDownload from './removeForceDownload.ts';

globalThis.addEventListener('load', async () => {
  console.log('Extension loaded.');

  await removeForceDownload.loader();
});
