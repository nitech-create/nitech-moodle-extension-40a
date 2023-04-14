import debugMode from '../common/debugMode.ts';
import loadFeature from '../common/loadFeature.ts';
import waitForPageLoad from './waitForPageLoad.ts';
import renderQuickCourseView from './renderQuickCourseView.ts';
import updateCourseRepository from './updateCourseRepository.ts';
import addEventsCountdown from './eventsCountdown.ts';

globalThis.addEventListener('load', () => {
  loadFeature(
    [
      waitForPageLoad,
      renderQuickCourseView,
      updateCourseRepository,
      addEventsCountdown,
    ],
    new URL(location.href),
    debugMode,
  );
});
