import type { Feature } from "../common/types.ts";
// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import { h, render } from 'https://cdnjs.cloudflare.com/ajax/libs/preact/10.13.2/preact.module.min.js';
import { QuickCourseView } from "./quickCourseView.tsx";

const renderQuickCourseView: Feature<void, void> = {
  uniqueName: 'dashboard-quick-course-view',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /\/moodle40a\/my\/(index\.php)?/,
  loader: () => new Promise((resolve, reject) => {
    const cardBlock = document.querySelector('aside#block-region-content');
    if(cardBlock === null) {
      reject(`[${renderQuickCourseView.uniqueName}]: Cannot find element to render quick course view in.`);
      return;
    }

    const wrapperSection = document.createElement('section');
    wrapperSection.className = 'block_myoverview block  card mb-3';
    wrapperSection.dataset['block'] = 'myoverview';
    cardBlock.insertBefore(wrapperSection, cardBlock.childNodes?.[0] ?? null);

    render(<QuickCourseView courses={[{name: 'Class 1'}, {name: 'Class 2'}]} />, wrapperSection);
    resolve();
  }),
}

export default renderQuickCourseView;
