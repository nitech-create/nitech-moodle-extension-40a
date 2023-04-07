import removeForceDownload from './removeForceDownload.ts';
import replaceNavigationText from './replaceNavigationText.ts';
import replaceHeaderCourseName from './replaceHeaderCourseName.ts';

globalThis.addEventListener('load', async () => {
  console.log('Extension loaded.');

  await Promise.all([
    replaceNavigationText.loader(),
    replaceHeaderCourseName.loader(),
    removeForceDownload.loader(),
  ]);
});
