// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import {
  ComponentChild,
  h,
  render,
} from 'https://cdnjs.cloudflare.com/ajax/libs/preact/10.13.2/preact.module.min.js';

interface Course {
  name: string;
}

const CourseItem = (props: { name: string }) => (
  <a href='javascript:void(0)'>
    {props.name}
  </a>
);

const ListGroup = (props: { items: ComponentChild[] }) => (
  <ul clasName='list-group'>
    {props.items.map((item) => (
      <li className='list-group-item course-listitem border-left-0 border-right-0 border-top-0 px-2 rounded-0'>
        {item}
      </li>
    ))}
  </ul>
);

const QuickCourseView = (props: { courses: Course[] }) => (
  <div className='card-body p-3'>
    <h5 class='card-title d-inline'>スケジュール</h5>
    <div className='card-text content mt-3'>
      <div
        className='block-myoverview block-cards'
        data-region='myoverview'
        role='navigation'
      >
        <hr className='mt-0' />
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
                    items={props.courses.map((course) => (
                      <CourseItem name={course.name} />
                    ))}
                  />
                </div>
              </div>
            </div>
            <div className='mt-1'></div>
          </div>
        </div>
      </div>
      <div className='footer'></div>
    </div>
  </div>
);

export { QuickCourseView };
