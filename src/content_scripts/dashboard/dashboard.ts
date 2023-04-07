import loadFeature from '../common/loadFeature.ts';
import waitForPageLoad from './waitForPageLoad.ts';
import renderQuickCourseView from './renderQuickCourseView.tsx';
import updateCourseRepository from './updateCourseRepository.ts';
import addEventsCountdown from './eventsCountdown.tsx';

globalThis.addEventListener('load', () => {
  loadFeature([
    waitForPageLoad,
    renderQuickCourseView,
    updateCourseRepository,
    addEventsCountdown,
  ], new URL(location.href), true);
});
