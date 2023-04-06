/** @jsxImportSource preact */

// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';
import { Course } from '../../../common/course.ts';
import ListGroup from './ListGroup.tsx';
import CourseItem from './CourseItem.tsx';

const QuickCourseViewBody = (props: { courses: Course[] }) => (
  <div className='container-fluid p-0'>
    <div
      data-region='courses-view'
      data-display='list'
      data-grouping='all'
      data-customfieldname
      data-customfieldvalue
    >
      <div data-region='paged-content-container'>
        <div
          data-region='page-container'
          className='paged-content-page-container'
          aria-live='polite'
        >
          <div data-region='paged-content-page' data-page='1'>
            <ListGroup
              items={props.courses.map((course) => ({
                key: course.fullName,
                element: <CourseItem course={course} />,
              }))}
            />
          </div>
        </div>
      </div>
      <div className='mt-1'></div>
    </div>
  </div>
);

export default QuickCourseViewBody;
