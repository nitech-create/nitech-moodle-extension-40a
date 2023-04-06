import waitForPageLoad from './waitForPageLoad.ts';
import renderQuickCourseView from './renderQuickCourseView.tsx';
import updateCourseRepository from './updateCourseRepository.ts';
import addEventsCountdown from './eventsCountdown.tsx';

globalThis.addEventListener('load', async () => {
  await waitForPageLoad.loader({
    timeout: 5000,
  });

  await Promise.all([
    addEventsCountdown.loader(),
    (async() => {
      await updateCourseRepository.loader();
      await renderQuickCourseView.loader();
    })(),
  ]);

});
