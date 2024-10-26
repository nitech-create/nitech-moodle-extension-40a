import { isDebug } from 'esbuild-plugin-debug-switch';

import { Course } from '~/common/model/course.ts';
import { debounceCallback } from '~/common/debounceCallback.ts';
import { reduceAndSaveCourses } from '~/common/newStorage/courses/index.ts';

const main = function () {
  if (isDebug) {
    console.log('Running ReadAndStoreCoureses');
  }

  const readAndStoreCoureses = function () {
    if (isDebug) {
      console.log('Reading courses');
    }

    const myOverview = document.querySelector('*[data-block="myoverview"]');
    if (!myOverview) return;

    const links = Array.from(myOverview.querySelectorAll(
      '*[data-region="courses-view"] ul a.coursename',
    )) as HTMLAnchorElement[];
    const coursesJson = links.map((link) => {
      try {
        const id = new URL(link.href).searchParams.get('id');
        if (!id) return null;

        return Course.fromJson({
          id,
          ...Course.parse(link.textContent || ''),
        }).toJson();
      } catch {
        return null;
      }
    }).filter((course) => course !== null);

    reduceAndSaveCourses({
      type: 'mergeAndSaveCourses',
      payload: {
        courses: coursesJson,
      },
    });
  };
  readAndStoreCoureses();

  const observer = new MutationObserver(
    debounceCallback(readAndStoreCoureses, 500),
  );
  observer.observe(document.body, { subtree: true, childList: true });
};

main();
