import type { Feature } from '../common/types.ts';
import {
  EventsCountdownProps,
  renderEventsCountdown,
} from './eventsCountdown/EventsCountdown.tsx';

type AddEventCountdownOptions = {
  enabled: boolean;
};

const CalendarLinkDateNumRegExp = /\?.*time=(\d+).*$/;

/** 直近イベントにカウントダウンを追加 */
const addEventsCountdown: Feature = {
  uniqueName: 'dashboard-events-countdown',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /^\/moodle40a\/my\/(index\.php)?$/,
  loader: (options) => {
    if (!options.enabled) {
      return;
    }

    const elUpcomingEvents = document.querySelector(
      'section.block_calendar_upcoming',
    );
    if (!elUpcomingEvents) {
      return;
    }

    const appRoot = document.createElement('div');
    appRoot.id = 'nitech_moodle_ext_events_countdown_root';
    elUpcomingEvents.append(appRoot);

    const elEventItems = Array.from(
      elUpcomingEvents.querySelectorAll<HTMLElement>(
        'div[data-region="event-item"]',
      ),
    );

    // 締め切り時間とそれを描画する DOM 要素のリストを作成
    const eventItems: EventsCountdownProps['items'] = [];
    for (const elEventItem of elEventItems) {
      const elLabel = elEventItem.querySelector('div.date');
      if (!elLabel) {
        continue;
      }
      const elLink = elLabel.querySelector('a');
      if (!elLink) {
        continue;
      }
      // elLink.href の例:
      //   https://cms7.ict.nitech.ac.jp/moodle40a/calendar/view.php?view=day&time=1680940800
      const dateNumMatch = CalendarLinkDateNumRegExp.exec(elLink.href);
      if (!dateNumMatch) {
        continue;
      }

      const expireDate = new Date(parseInt(dateNumMatch[1]) * 1000);

      const elCountdown = document.createElement('div');
      elCountdown.className = 'nitech-moodle-ext-event-countdown';
      elLabel.appendChild(elCountdown);

      eventItems.push({
        expireDate,
        portalTarget: elCountdown,
      });
    }

    renderEventsCountdown({ items: eventItems }, appRoot);

    // ツリーが変化した際 (イベントの削除など) にカウントダウンが削除されるため
    // ツリーの変更を監視する
    const observer = new MutationObserver(() => {
      observer.disconnect();
      // `preact.render(...)` ではうまくいかなかった
      addEventsCountdown.loader(options);
    });
    observer.observe(elUpcomingEvents, {
      childList: true,
      subtree: true,
    });
  },
};

export default addEventsCountdown;
