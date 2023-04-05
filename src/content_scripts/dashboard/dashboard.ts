import waitForPageLoad from './waitForPageLoad.ts';
import renderQuickCourseView from './renderQuickCourseView.tsx';
import updateCourseRepository from './updateCourseRepository.ts';

globalThis.addEventListener('load', async () => {
  console.log('Extension loaded.');

  await waitForPageLoad.loader({
    timeout: 5000,
  });

  await updateCourseRepository.loader();

  await renderQuickCourseView.loader();
});
