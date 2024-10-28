import { isDebug } from 'esbuild-plugin-debug-switch';

import { debounceCallback } from '~/common/debounceCallback.ts';
import { getPreferences } from '~/common/newStorage/preferences/index.ts';
import { getCourses } from '~/common/newStorage/courses/index.ts';

const main = async function () {
  const preferences = await getPreferences();
  if (!preferences.replaceBreadcrumbCourseName.enabled) return;

  if (isDebug) {
    console.log('ReplaveBreadcrumbCourseName is enabled.');
  }

  const courses = await getCourses();
  const replacementMap = new Map<string, string>();
  for (const course of courses) {
    if (!course.systemCourseName) continue;
    replacementMap.set(course.systemCourseName, course.name);
  }

  const replaceBreadcrumbCourseName = function () {
    const breadcrumb = document.querySelector('#page-header nav ol.breadcrumb');
    if (!breadcrumb) return;

    const links = Array.from(
      breadcrumb.querySelectorAll('li a'),
    ) as HTMLAnchorElement[];
    for (const link of links) {
      const content = link.textContent?.trim();
      if (!content) continue;

      link.textContent = replacementMap.get(content) ?? content;
    }
  };
  replaceBreadcrumbCourseName();

  const observer = new MutationObserver(
    debounceCallback(replaceBreadcrumbCourseName, 500),
  );
  observer.observe(document.body, { childList: true });
};

main();
