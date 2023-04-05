import * as storage from './storage.ts';

export interface RegularLectureCourse {
  type: 'regular-lecture',
  /** 講義名 */
  name: string,
  /** moodle での表示名 */
  fullName: string,
  /** 開講する年度 */
  fullYear: number,
  /** 第一部 / 第二部 */
  curriculumPart: 1 | 2,
  /** 講義番号 */
  code: number,
  /** 開講する時期 (前期 / 後期 / 第1クオーター など) */
  semester: '1/2' | '2/2' | '1/1' | '1/4' | '2/4' | '3/4' | '4/4' | 'unfixed',
  /** 開講する曜日 */
  weekOfDay: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat',
  /** 開口する時間 (コマ) [`start`, `end`] */
  period: [number, number],
  /** moodle ページのID */
  pageId: number,
}

export interface SpecialCourse {
  type: 'special',
  /** 講義名 */
  name: string,
  /** moodle での表示名 */
  fullName: string,
  /** 開講する年度 */
  fullYear?: number,
  /** moodle ページのID */
  pageId: number,
}

export type Course = RegularLectureCourse | SpecialCourse;

const storageCourseKey = 'courses';

const getCourses = async function() {
  return await storage.get(storageCourseKey);
}

const storeCourseByMerge = async function(courses: Course[]) {
  await storage.update(storageCourseKey, ((prevCourses) => {
    const map = new Map<string, Course>();
    prevCourses.forEach((course) => map.set(course.fullName, course));
    courses.forEach((course) => map.set(course.fullName, course));

    return Array.from(map.values());
  }));
}

export {
  getCourses,
  storeCourseByMerge
}
