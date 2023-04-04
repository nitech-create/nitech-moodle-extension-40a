import waitForPageLoad from './waitForPageLoad.ts';

globalThis.addEventListener('load', async () => {
  console.log('Extension loaded.');

  await waitForPageLoad.loader({
    timeout: 5000
  }).then(() => {
    console.log('page loaded');
  }).catch((err) => {
    console.error(`Error occurred in ${waitForPageLoad.uniqueName}`);
    throw err;
  });
});
