import type { Feature } from '../common/types.ts';
import { getCourses } from '../../common/storage/course.ts';

interface Options {
  enabled: boolean;
}

/** ヘッダーのコース表示名をわかりやすい表示に変更する */
const replaceHeaderCourseName: Feature = {
  uniqueName: 'all-pages-replace-header-course-name',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /^\/moodle40a\//,
  loader: async (options?: Options) => {
    if (options?.enabled === false) {
      return;
    }

    const elHeader = document.getElementById('page-header');
    if (!elHeader) {
      return;
    }

    const courses = await getCourses();
    const courseNameMap = new Map<string, string>();
    for (const course of courses) {
      if (course.type === 'regular-lecture') {
        courseNameMap.set(
          course.shortName,
          `${course.name} ${course.shortName}`,
        );
      } else {
        courseNameMap.set(course.shortName, course.fullName);
      }
    }

    const elBreadcrumbLinks = elHeader.querySelectorAll<HTMLElement>(
      'nav li a',
    );
    elBreadcrumbLinks.forEach((elLink) => {
      const shortName = elLink.textContent ?? '';
      const courseName = courseNameMap.get(shortName);

      if (typeof courseName === 'string') {
        elLink.textContent = courseName;
      }
    });
  },
};

export default replaceHeaderCourseName;
