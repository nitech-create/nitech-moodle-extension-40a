/** @jsxImportSource preact */

// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';
import { Course } from '../../../common/course.ts';
import { weekOfDayMap } from './defs.ts';

const CourseItem = (
  props: { course: Course },
) => {
  const course = props.course;
  if (course.type === 'regular-lecture') {
    return (
      <a
        href={`https://cms7.ict.nitech.ac.jp/moodle40a/course/view.php?id=${course.pageId}`}
      >
        {weekOfDayMap[course.weekOfDay]} {course.period[0]}-{course.period[1]}限
        {' '}
        {course.name}
      </a>
    );
  } else {
    return (
      <a
        href={`https://cms7.ict.nitech.ac.jp/moodle40a/course/view.php?id=${course.pageId}`}
      >
        {course.name}
      </a>
    );
  }
};

export default CourseItem;
