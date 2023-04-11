/** @jsxImportSource preact */

// @deno-types="preact/types"
import * as preact from 'preact';
import * as hooks from 'preact/hooks';
import { Course, RegularLectureCourse } from '../../../common/course.ts';
import QuickCourseViewControl from './QuickCourseViewControl.tsx';
import QuickCourseViewBody from './QuickCourseViewBody.tsx';
import {
  Filter,
  semesterMap,
  semesterOrdering,
  weekOfDayOrdering,
} from './defs.ts';

const filterCourse = function (courses: Course[], filter: string) {
  if (filter === 'all') {
    return courses;
  }

  const [yearStr, semester] = filter.split('-');
  const year = parseInt(yearStr);
  const yearFiltered = courses.filter((course) => course.fullYear === year);

  if (typeof semester !== 'string') {
    return yearFiltered;
  }

  // TODO: 範囲に共通部分がある場合 (前期と通年, 前期とQ1など) もマッチさせる

  return yearFiltered
    .filter((course) =>
      course.type === 'regular-lecture' && course.semester === semester
    );
};

const compareCourse = function (course1: Course, course2: Course) {
  if (
    course1.type === 'regular-lecture' && course2.type === 'regular-lecture'
  ) {
    // 通常の講義
    if (course1.fullYear !== course2.fullYear) {
      return course1.fullYear - course2.fullYear;
    }
    if (course1.semester !== course2.semester) {
      return semesterOrdering[course1.semester] -
        semesterOrdering[course2.semester];
    }
    if (course1.weekOfDay !== course2.weekOfDay) {
      return weekOfDayOrdering[course1.weekOfDay] -
        weekOfDayOrdering[course2.weekOfDay];
    }
    const periodDiff = (course1.period[1] - course2.period[1]) * 10 -
      (course1.period[0] - course2.period[0]);
    if (periodDiff !== 0) {
      return periodDiff;
    }

    return course1.code - course2.code;
  } else if (course1.type === 'special' && course2.type === 'special') {
    // 特殊な講義
    if (course1.fullYear !== course2.fullYear) {
      return (course1.fullYear ?? 10000) - (course2.fullYear ?? 10000);
    }

    return course1.fullName < course2.fullName ? -1 : 1;
  } else if (course1.type !== 'regular-lecture') {
    // 通常の講義を優先する
    return 1;
  } else if (course2.type !== 'regular-lecture') {
    // 通常の講義を優先する
    return -1;
  }

  return 0;
};

const QuickCourseView = (props: { courses: Course[] }) => {
  const courses = props.courses;
  const regularCourses = courses
    .filter((course) =>
      course.type === 'regular-lecture'
    ) as RegularLectureCourse[];

  const date = new Date();
  const shiftedDate = new Date(
    date.getFullYear(),
    date.getMonth() - 3,
    date.getDate(),
  );
  // 現在の年と前期/後期のフィルターを最初に選択する
  const [filter, setFilter] = hooks.useState<Filter>(
    `${shiftedDate.getFullYear()}-${
      shiftedDate.getMonth() < 6 ? '1/2' : '2/2'
    }`,
  );

  const filters = [
    { display: 'すべて', value: 'all' },
  ];
  // 年, 学期の組によるフィルター
  const semestersMap = new Map<
    string,
    [RegularLectureCourse['fullYear'], RegularLectureCourse['semester']]
  >();
  regularCourses.forEach((course) => {
    semestersMap.set(`${course.fullYear}-${course.semester}`, [
      course.fullYear,
      course.semester,
    ]);
  });
  semestersMap.set(
    `${shiftedDate.getFullYear()}-${
      shiftedDate.getMonth() < 6 ? '1/2' : '2/2'
    }`,
    [shiftedDate.getFullYear(), shiftedDate.getMonth() < 6 ? '1/2' : '2/2'],
  );
  const semesters = Array.from(semestersMap.values()).sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return semesterOrdering[a[1]] - semesterOrdering[b[1]];
  });
  // 年だけのフィルター
  const years = Array.from(
    new Set(regularCourses.map((course) => course.fullYear)),
  ).sort();

  semesters.forEach(([year, semester]) => {
    filters.push({
      display: `${year}年 ${semesterMap[semester]}`,
      value: `${year}-${semester}`,
    });
  });
  years.forEach((year) => {
    filters.push({
      display: `${year}年`,
      value: `${year}`,
    });
  });

  return (
    <div id='moodle_ext_quick_course_view' className='card-body p-3'>
      <h5 class='card-title d-inline'>コースリンク</h5>
      <div className='card-text content mt-3'>
        <div
          className='block-quickcouseview block-cards'
          data-region='quickcouseview'
          role='navigation'
        >
          <hr className='mt-0' />
          <QuickCourseViewControl
            filterDisplay='2023年前期'
            filterValue={filter}
            setFilter={setFilter}
            filterList={filters}
          />
          <QuickCourseViewBody
            courses={filterCourse(courses, filter).sort(compareCourse)}
          />
        </div>
        <div className='footer'></div>
      </div>
    </div>
  );
};

const renderQuickCourseView = function (
  courses: Course[],
  targetElement: HTMLElement,
) {
  preact.render(
    <QuickCourseView courses={courses} />,
    targetElement,
  );
};

export { renderQuickCourseView };
