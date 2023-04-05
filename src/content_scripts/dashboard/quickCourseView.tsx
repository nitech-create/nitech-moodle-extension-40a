/** @jsxImportSource preact */
// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';
import * as hooks from 'preact/hooks';
import { Course, RegularLectureCourse } from '../../common/storage/course.ts';

type Filter = string;

const semesterMap = {
  '1/2': '前期',
  '2/2': '後期',
  '1/1': '通年',
  '1/4': '第1クオーター',
  '2/4': '第2クオーター',
  '3/4': '第3クオーター',
  '4/4': '第4クオーター',
  'unfixed': '未定',
} as const;
const semesterOrder = {
  '1/2': 1,
  '2/2': 2,
  '1/1': 3,
  '1/4': 4,
  '2/4': 5,
  '3/4': 6,
  '4/4': 7,
  'unfixed': 8,
} as const;
const weekOfDayMap = {
  'sun': '日曜',
  'mon': '月曜',
  'tue': '火曜',
  'wed': '水曜',
  'thu': '木曜',
  'fri': '金曜',
  'sat': '土曜',
} as const;
const weekOfDayOrder = {
  'sun': 6,
  'mon': 0,
  'tue': 1,
  'wed': 2,
  'thu': 3,
  'fri': 4,
  'sat': 5
} as const;

const CourseItem = (
  props: { course: Course }
) => {
  const course = props.course;
  if(course.type === 'regular-lecture') {
    return (
      <a href={`https://cms7.ict.nitech.ac.jp/moodle40a/course/view.php?id=${course.pageId}`}>
        {weekOfDayMap[course.weekOfDay]} {course.period[0]}-{course.period[1]}限 {course.name}
      </a>
    );
  } else {
    return (
      <a href={`https://cms7.ict.nitech.ac.jp/moodle40a/course/view.php?id=${course.pageId}`}>
        {course.name}
      </a>
    );
  }
};

const ListGroup = (
  props: { items: { key: string, element: preact.ComponentChild}[] }
) => (
  <ul className='list-group'>
    {props.items.map((item) => (
      <li key={item.key} className='list-group-item course-listitem border-left-0 border-right-0 border-top-0 px-2 rounded-0'>
        {item.element}
      </li>
    ))}
  </ul>
);

const QuickCourseViewControl = (
  props: {
    filterDisplay: string,
    filterValue: Filter,
    setFilter: hooks.StateUpdater<Filter>,
    filterList: {display: string, value: Filter}[],
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
          <li key={filterItem.value}>
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
              items={props.courses.map((course) => ({
                key: course.fullName,
                element: (<CourseItem course={course} />)
              }))}
            />
          </div>
        </div>
      </div>
      <div className='mt-1'></div>
    </div>
  </div>
);

const filterCourse = function(courses: Course[], filter: string) {
  if(filter === 'all') {
    return courses;
  }

  const [yearStr, semester] = filter.split('-');
  const year = parseInt(yearStr);
  const yearFiltered = courses.filter((course) => course.fullYear === year);

  if(typeof semester !== 'string') {
    return yearFiltered;
  }

  return yearFiltered
    .filter((course) => course.type === 'regular-lecture' && course.semester === semester);
}

const compareCourse = function(course1: Course, course2: Course) {
  if(course1.type === 'regular-lecture' && course2.type === 'regular-lecture') {
    // 通常の講義
    if(course1.fullYear !== course2.fullYear) {
      return course1.fullYear - course2.fullYear;
    }
    if(course1.semester !== course2.semester) {
      return semesterOrder[course1.semester] - semesterOrder[course2.semester];
    }
    if(course1.weekOfDay !== course2.weekOfDay) {
      return weekOfDayOrder[course1.weekOfDay] - weekOfDayOrder[course2.weekOfDay];
    }
    const periodDiff = (course1.period[1] - course2.period[1]) * 10
    - (course1.period[0] - course2.period[0]);
    if(periodDiff !== 0) {
      return periodDiff;
    }

    return course1.code - course2.code;
  } else if(course1.type === 'special' && course2.type === 'special') {
    // 特殊な講義
    if(course1.fullYear !== course2.fullYear) {
      return (course1.fullYear ?? 10000) - (course2.fullYear ?? 10000);
    }

    return course1.fullName < course2.fullName ? -1 : 1;
  } else if(course1.type !== 'regular-lecture') {
    // 通常の講義を優先する
    return 1;
  } else if(course2.type !== 'regular-lecture') {
    // 通常の講義を優先する
    return -1;
  }

  return 0;
}

const QuickCourseView = (props: { courses: Course[] }) => {
  const courses = props.courses;
  const regularCourses = courses
    .filter((course) => course.type === 'regular-lecture') as RegularLectureCourse[];

  const date = new Date();
  const shiftedDate = new Date(
    date.getFullYear(),
    date.getMonth() - 3,
    date.getDate()
  );
  // 現在の年と前期/後期のフィルターを最初に選択する
  const [filter, setFilter] = hooks.useState<Filter>(
    `${shiftedDate.getFullYear()}-${shiftedDate.getMonth() < 6 ? '1/2' : '2/2'}`
  );

  const filters = [
    { display: 'すべて', value: 'all' }
  ];
  // 年, 学期の組によるフィルター
  const semestersMap = new Map<string, [RegularLectureCourse["fullYear"], RegularLectureCourse["semester"]]>();
  regularCourses.forEach((course) => {
    semestersMap.set(`${course.fullYear}-${course.semester}`, [course.fullYear, course.semester]);
  });
  semestersMap.set(
    `${shiftedDate.getFullYear()}-${shiftedDate.getMonth() < 6 ? '1/2' : '2/2'}`,
    [shiftedDate.getFullYear(), shiftedDate.getMonth() < 6 ? '1/2' : '2/2']
  );
  const semesters = Array.from(semestersMap.values()).sort((a, b) => {
    if(a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return semesterOrder[a[1]] - semesterOrder[b[1]];
  });
  // 年だけのフィルター
  const years = Array.from(new Set(regularCourses.map((course) => course.fullYear))).sort();

  semesters.forEach(([year, semester]) => {
    filters.push({
      display: `${year}年 ${semesterMap[semester]}`,
      value: `${year}-${semester}`
    });
  });
  years.forEach((year) => {
    filters.push({
      display: `${year}年`,
      value: `${year}`
    });
  });

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
            filterList={filters} />
          <QuickCourseViewBody
            courses={filterCourse(courses, filter).sort(compareCourse)} />
        </div>
        <div className='footer'></div>
      </div>
    </div>
  );
}

export { QuickCourseView };
