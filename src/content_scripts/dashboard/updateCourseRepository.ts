import { Course, RegularLectureCourse } from '../../common/course.ts';
import { storeCourseByMerge } from '../../common/storage/course.ts';
import type { Feature } from '../common/types.ts';
import waitForPageLoad from './waitForPageLoad.ts';
import { textToSemesterMap, textToWeekOfDayMap } from '../../common/course.ts';

const regularCourseRegExp =
  /^(.+)\s*(\d{4})(\d)(\d{4})\s*(前期|後期)\s*((?:日|月|火|水|木|金|土)曜)\s*(\d)-(\d\d?)限/;

interface DecodedLectureCourse {
  type: RegularLectureCourse['type'];
  name: RegularLectureCourse['name'];
  fullName: RegularLectureCourse['fullName'];
  fullYear: RegularLectureCourse['fullYear'];
  curriculumPart: RegularLectureCourse['curriculumPart'];
  code: RegularLectureCourse['code'];
  semester: RegularLectureCourse['semester'];
  weekOfDay: RegularLectureCourse['weekOfDay'];
  period: RegularLectureCourse['period'];
}

const decodeRegularLectureCourseText = function (
  text: string,
): DecodedLectureCourse {
  const match = regularCourseRegExp.exec(text);
  if (match === null) {
    throw Error(`"${text}" does not matches to the pattern`);
  }

  const curriculumPart = parseInt(match[3]);
  if (curriculumPart !== 1 && curriculumPart !== 2) {
    throw Error(`${curriculumPart} is not a valid curriculum part`);
  }
  if (!(match[5] in textToSemesterMap)) {
    throw Error(`${match[5]} is not a valid semester`);
  }
  const semester =
    textToSemesterMap[match[5] as keyof typeof textToSemesterMap];
  if (!(match[6] in textToWeekOfDayMap)) {
    throw Error(`${match[6]} is not a valid week of day`);
  }
  const weekOfDay =
    textToWeekOfDayMap[match[6] as keyof typeof textToWeekOfDayMap];

  return {
    type: 'regular-lecture',
    name: match[1].trim(),
    fullName: text,
    fullYear: parseInt(match[2]),
    curriculumPart,
    code: parseInt(match[4]),
    semester,
    weekOfDay,
    period: [parseInt(match[7]), parseInt(match[8])],
  };
};

const pageLinkIdRegExp = /id=(\d+)/;
/** コースのリストを「コース概要」のセクションから
 * 読み取り、ストレージに保存する */
const updateCourseRepository: Feature<void, void> = {
  uniqueName: 'dashboard-update-course-repository',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /\/moodle40a\/my\/(index\.php)?/,
  dependencies: [waitForPageLoad.uniqueName],
  loader: () => {
    const thisYear = new Date().getFullYear();
    const thisYearStr = `${thisYear}`;
    const elMyOverview = document.getElementById('inst19090');
    if (!elMyOverview) {
      throw Error(
        `[${updateCourseRepository.uniqueName}] Failed to get "my overview" section`,
      );
    }

    // コース表示はマルチページになっている
    // 実際になっている様子を確認していないのでちゃんと動くかは要検証
    const courses: Course[] = [];
    const elItemLinks = Array.from(
      elMyOverview.querySelectorAll('ul.list-group li a.aalink.coursename'),
    ) as HTMLAnchorElement[];
    for (const elItemLink of elItemLinks) {
      const search = new URL(elItemLink.href).search;
      const pageIdMatch = pageLinkIdRegExp.exec(search);
      const pageId = parseInt(pageIdMatch?.[1] ?? '0');
      const elShortName = elItemLink.previousElementSibling?.querySelector(
        'div > div',
      );

      if (!elShortName) {
        continue;
      }
      const shortName = elShortName.textContent ?? '';

      const text = Array.from(elItemLink.childNodes)
        .filter((v) => v.nodeType === 3)
        .map((v) => v.textContent)
        .join('')
        .trim();
      try {
        courses.push({
          ...decodeRegularLectureCourseText(text),
          pageId,
          shortName,
        });
      } catch {
        courses.push({
          type: 'special',
          name: text,
          fullName: text,
          fullYear: text.includes(thisYearStr) ? thisYear : undefined,
          pageId,
          shortName,
        });
      }
    }

    storeCourseByMerge(courses);
  },
};

export default updateCourseRepository;
