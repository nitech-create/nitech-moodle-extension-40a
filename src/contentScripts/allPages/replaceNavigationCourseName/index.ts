import { isDebug } from 'esbuild-plugin-debug-switch';

import { debounceCallback } from '~/common/debounceCallback.ts';
import { getPreferences } from '~/common/newStorage/preferences/index.ts';
import { getCourses } from '~/common/newStorage/courses/index.ts';

const main = async function () {
  const preferences = await getPreferences();
  if (!preferences.replaceNavigationCourseName.enabled) return;

  if (isDebug) {
    console.log('ReplaceNavigationCourseName is enabled.');
  }

  const courses = await getCourses();
  const replacementMap = new Map<string, string>();
  for (const course of courses) {
    if (!course.systemCourseName) continue;
    replacementMap.set(course.systemCourseName, course.name);
  }

  const replaceNavigationCourseName = function () {
    const navigation = document.querySelector('*[role="navigation"]');
    if (!navigation) return;

    const links = Array.from(
      navigation.querySelectorAll('*[role="treeitem"] a'),
    ) as HTMLAnchorElement[];

    for (const link of links) {
      const content = link.textContent?.trim();
      if (!content) continue;

      link.textContent = replacementMap.get(content) ?? content;
    }
  };
  replaceNavigationCourseName();

  const observer = new MutationObserver(
    debounceCallback(replaceNavigationCourseName, 500),
  );
  observer.observe(document.body, { childList: true });
};

main();
