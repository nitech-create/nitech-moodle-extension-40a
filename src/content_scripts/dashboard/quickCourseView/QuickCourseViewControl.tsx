/** @jsxImportSource preact */

// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';
import * as hooks from 'preact/hooks';
import { Filter } from './defs.ts';

const QuickCourseViewControl = (
  props: {
    filterDisplay: string;
    filterValue: Filter;
    setFilter: hooks.StateUpdater<Filter>;
    filterList: { display: string; value: Filter }[];
  },
) => (
  <div
    data-region='filter'
    className='d-flex align-items-center my-2'
    aria-label='コースリンクコントロール'
  >
    <div className='dropdown mb-1 mr-auto'>
      <button
        type='button'
        className='btn btn-outline-secondary dropdown-toggle'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        aria-label='グルーピングドロップダウンメニュ'
      >
        <span data-active-item-text>
          {props.filterDisplay}
        </span>
      </button>
      <ul
        className='dropdown-menu'
        role='menu'
        data-show-active-item
        data-skip-active-class='true'
        data-active-item-text
        aria-labelledby='groupingdropwodn'
      >
        <li className='dropdown-divider' role='presentation'>
          <span className='filler'>&nbsp;</span>
        </li>
        {props.filterList.map((filterItem) => (
          <li key={filterItem.value}>
            <a
              href='javascript:void(0)'
              className='dropdown-item'
              data-filter='grouping'
              data-value={filterItem.value}
              data-pref={filterItem.value}
              aria-current={filterItem.value === props.filterValue}
              onClick={() => props.setFilter(filterItem.value)}
            >
              {filterItem.display}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default QuickCourseViewControl;
