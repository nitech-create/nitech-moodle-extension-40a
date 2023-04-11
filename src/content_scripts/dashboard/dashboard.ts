import loadFeature from '../common/loadFeature.ts';
import waitForPageLoad from './waitForPageLoad.ts';
import renderQuickCourseView from './renderQuickCourseView.ts';
import updateCourseRepository from './updateCourseRepository.ts';
import addEventsCountdown from './eventsCountdown.ts';
import { FeatureOption } from '../../common/options.ts';
import { Feature } from '../common/types.ts';

globalThis.addEventListener('load', () => {
  loadFeature(
    [
      // WANTFIX: 型を破壊している
      // オプションの所在を外部に移すなど型を整備する必要がある
      waitForPageLoad as unknown as Feature<FeatureOption>,
      renderQuickCourseView,
      updateCourseRepository,
      addEventsCountdown,
    ],
    new URL(location.href),
    false,
  );
});
