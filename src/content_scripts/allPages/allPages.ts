import loadFeature from '../common/loadFeature.ts';
import removeForceDownload from './removeForceDownload.ts';
import replaceNavigationText from './replaceNavigationText.ts';
import replaceHeaderCourseName from './replaceHeaderCourseName.ts';

globalThis.addEventListener('load', () => {
  console.log('Extension loaded.');

  loadFeature([
    removeForceDownload,
    replaceNavigationText,
    replaceHeaderCourseName,
  ], new URL(location.href), true);
});
