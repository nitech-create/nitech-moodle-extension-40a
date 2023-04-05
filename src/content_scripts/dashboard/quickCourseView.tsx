/** @jsxImportSource preact */
// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';
import * as hooks from 'preact/hooks';
import { Course } from '../../common/storage/course.ts';

const CourseItem = (
  props: { name: string, pageId: number }
) => (
  <a href={`https://cms7.ict.nitech.ac.jp/moodle40a/course/view.php?id=${props.pageId}`}>
    {props.name}
  </a>
);

const ListGroup = (props: { items: preact.ComponentChild[] }) => (
  <ul className='list-group'>
    {props.items.map((item) => (
      <li className='list-group-item course-listitem border-left-0 border-right-0 border-top-0 px-2 rounded-0'>
        {item}
      </li>
    ))}
  </ul>
);

const QuickCourseViewControl = (
  props: {
    filterDisplay: string,
    filterValue: string,
    setFilter: hooks.StateUpdater<string>,
    filterList: {display: string, value: string}[],
  }
) => (
  <div
    data-region="filter"
    className="d-flex align-items-center my-2"
    aria-label="スケジュールコントロール" >
    <div className="dropdown mb-1 mr-auto">
      <button
        type="button"
        className="btn btn-outline-secondary dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="グルーピングドロップダウンメニュ" >
        <span data-active-item-text>
          {props.filterDisplay}
        </span>
      </button>
      <ul
        className="dropdown-menu"
        role="menu"
        data-show-active-item
        data-skip-active-class="true"
        data-active-item-text
        aria-labelledby="groupingdropwodn">
        <li className="dropdown-divider" role="presentation">
          <span className="filler">&nbsp;</span>
        </li>
        {props.filterList.map((filterItem) => (
          <li>
            <a
              href="javascript:void(0)"
              className="dropdown-item"
              data-filter="grouping"
              data-value={filterItem.value}
              data-pref={filterItem.value}
              aria-current={filterItem.value === props.filterValue}
              onClick={() => props.setFilter(filterItem.value)} >
              {filterItem.display}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const QuickCourseViewBody = (props: { courses: Course[] }) => (
  <div className='container-fluid p-0'>
    <div
      data-region='courses-view'
      data-display='list'
      data-grouping='all'
      data-customfieldname
      data-customfieldvalue >
      <div data-region='paged-content-container'>
        <div
          data-region='page-container'
          className='paged-content-page-container'
          aria-live='polite' >
          <div data-region='paged-content-page' data-page='1'>
            <ListGroup
              items={props.courses.map((course) => (
                <CourseItem
                  name={course.name}
                  pageId={course.pageId} />
              ))}
            />
          </div>
        </div>
      </div>
      <div className='mt-1'></div>
    </div>
  </div>
);

const QuickCourseView = (props: { courses: Course[] }) => {
  const date = new Date();
  const shiftedDate = new Date(
    date.getFullYear(),
    date.getMonth() - 3,
    date.getDate()
  );
  const [filter, setFilter] = hooks.useState(
    `${shiftedDate.getFullYear()}/${shiftedDate.getMonth() < 6 ? '1/2' : '2/2'}`
  );

  return (
    <div id="moodle_ext_quick_course_view" className='card-body p-3'>
      <h5 class='card-title d-inline'>スケジュール</h5>
      <div className='card-text content mt-3'>
        <div
          className='block-myoverview block-cards'
          data-region='myoverview'
          role='navigation'
        >
          <hr className='mt-0' />
          <QuickCourseViewControl
            filterDisplay='2023年前期'
            filterValue={filter}
            setFilter={setFilter}
            filterList={[
              { display: 'すべて', value: 'all' },
              { display: '2023年前期', value: '2023-1/2' },
              { display: '2023年後期', value: '2023-2/2' }
            ]} />
          <QuickCourseViewBody courses={props.courses} />
        </div>
        <div className='footer'></div>
      </div>
    </div>
  );
}

export { QuickCourseView };
