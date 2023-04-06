interface RegularLectureCourse {
  type: 'regular-lecture';
  /** 講義名 */
  name: string;
  /** moodle での表示名 */
  fullName: string;
  /** 開講する年度 */
  fullYear: number;
  /** 第一部 / 第二部 */
  curriculumPart: 1 | 2;
  /** 講義番号 */
  code: number;
  /** 開講する時期 (前期 / 後期 / 第1クオーター など) */
  semester: '1/2' | '2/2' | '1/1' | '1/4' | '2/4' | '3/4' | '4/4' | 'unfixed';
  /** 開講する曜日 */
  weekOfDay: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
  /** 開口する時間 (コマ) [`start`, `end`] */
  period: [number, number];
  /** moodle ページのID */
  pageId: number;
  /** moodle のコース省略名 */
  shortName: string;
}

interface SpecialCourse {
  type: 'special';
  /** 講義名 */
  name: string;
  /** moodle での表示名 */
  fullName: string;
  /** 開講する年度 */
  fullYear?: number;
  /** moodle ページのID */
  pageId: number;
  /** moodle のコース省略名 */
  shortName: string;
}

type Course = RegularLectureCourse | SpecialCourse;

const semesterToTextMap = {
  '1/2': '前期',
  '2/2': '後期',
  '1/1': '通年',
  '1/4': '第1クオーター',
  '2/4': '第2クオーター',
  '3/4': '第3クオーター',
  '4/4': '第4クオーター',
  'unfixed': '未定',
} as const;

const textToSemesterMap = {
  '前期': '1/2',
  '後期': '2/2',
  '通年': '1/1',
  '第1クオーター': '1/4',
  '第2クオーター': '2/4',
  '第3クオーター': '3/4',
  '第4クオーター': '4/4',
  '未定': 'unfixed',
} as const;

const semesterOrdering = {
  '1/2': 1,
  '2/2': 2,
  '1/1': 3,
  '1/4': 4,
  '2/4': 5,
  '3/4': 6,
  '4/4': 7,
  'unfixed': 8,
} as const;

const weekOfDayToTextMap = {
  'sun': '日曜',
  'mon': '月曜',
  'tue': '火曜',
  'wed': '水曜',
  'thu': '木曜',
  'fri': '金曜',
  'sat': '土曜',
} as const;

const textToWeekOfDayMap = {
  '日曜': 'sun',
  '月曜': 'mon',
  '火曜': 'tue',
  '水曜': 'wed',
  '木曜': 'thu',
  '金曜': 'fri',
  '土曜': 'sat',
} as const;

const weekOfDayOrdering = {
  'sun': 6,
  'mon': 0,
  'tue': 1,
  'wed': 2,
  'thu': 3,
  'fri': 4,
  'sat': 5,
} as const;

export type { Course, RegularLectureCourse, SpecialCourse };

export {
  semesterOrdering,
  semesterToTextMap,
  textToSemesterMap,
  textToWeekOfDayMap,
  weekOfDayOrdering,
  weekOfDayToTextMap,
};
