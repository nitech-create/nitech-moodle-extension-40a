import { getOptions, storeOptionsByMerge } from '../common/storage/options.ts';
import { renderApp } from './app/App.tsx';

globalThis.addEventListener('load', () => {
  getOptions().then((options) => {
    console.log(options);
  });

  const elAppRoot = document.getElementById('app_root');
  if (!elAppRoot) {
    throw Error(`element #app_root is not found`);
  }
  renderApp(elAppRoot);
});
