import removeForceDownload from './removeForceDownload.ts';
import replaceNavigationText from './replaceNavigationText.ts';

globalThis.addEventListener('load', async () => {
  console.log('Extension loaded.');

  await Promise.all([
    replaceNavigationText.loader(),
    await removeForceDownload.loader(),
  ]);
});
