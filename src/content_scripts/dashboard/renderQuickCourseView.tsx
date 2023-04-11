/** @jsxImportSource preact */

// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';
import type { Feature } from '../common/types.ts';
import { QuickCourseView } from './quickCourseView/QuickCourseView.tsx';
import { getCourses } from '../../common/storage/course.ts';

type RenderQuickCourseViewOptions = {
  enabled: boolean;
};

const renderQuickCourseView: Feature<RenderQuickCourseViewOptions> = {
  uniqueName: 'dashboard-quick-course-view',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /^\/moodle40a\/my\/(index\.php)?$/,
  defaultOption: {
    enabled: true,
  },
  loader: (options) => {
    if (!options.enabled) {
      return;
    }

    return new Promise((resolve, reject) => {
      const cardBlock = document.querySelector('aside#block-region-content');
      if (cardBlock === null) {
        reject(
          `[${renderQuickCourseView.uniqueName}]: Cannot find element to render quick course view in.`,
        );
        return;
      }

      const wrapperSection = document.createElement('section');
      wrapperSection.className = 'block_quickcourseview block  card mb-3';
      wrapperSection.dataset['block'] = 'quickcourseview';
      cardBlock.insertBefore(wrapperSection, cardBlock.childNodes?.[0] ?? null);

      getCourses().then((courses) => {
        preact.render(
          <QuickCourseView
            courses={courses}
          />,
          wrapperSection,
        );
        resolve();
      });
    });
  },
};

export default renderQuickCourseView;
