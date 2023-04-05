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
  period: [number, number]
}

export interface SpecialCourse {
  type: 'special',
  /** 講義名 */
  name: string,
  /** moodle での表示名 */
  fullName: string,
  /** 開講する年度 */
  fullYear?: number
}

export type Course = RegularLectureCourse | SpecialCourse;
