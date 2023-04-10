import loadFeature from '../common/loadFeature.ts';
import collapseToc from './collapseToc.ts';

globalThis.addEventListener('load', () => {
  loadFeature(
    [
      collapseToc,
    ],
    new URL(location.href),
    false,
  );
});
