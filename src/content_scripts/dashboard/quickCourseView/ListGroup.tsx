/** @jsxImportSource preact */

// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';

const ListGroup = (
  props: { items: { key: string; element: preact.ComponentChild }[] },
) => (
  <ul className='list-group'>
    {props.items.map((item) => (
      <li
        key={item.key}
        className='list-group-item course-listitem border-left-0 border-right-0 border-top-0 px-2 rounded-0'
      >
        {item.element}
      </li>
    ))}
  </ul>
);

export default ListGroup;
