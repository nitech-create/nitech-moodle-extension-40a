/** @jsxImportSource preact */

// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';

interface ToggleBoxProps {
  uniqueId: string;
  labelText: string;
  checked: boolean;
  onClick: () => void;
}

const ToggleBox = (props: ToggleBoxProps) => (
  <li key={props.uniqueId}>
    <div className='label'>
      <label htmlFor={props.uniqueId}>
        {props.labelText}
      </label>
    </div>
    <div className='control'>
      <input
        type='checkbox'
        id={props.uniqueId}
        checked={props.checked}
        onClick={props.onClick}
      />
      <label htmlFor={props.uniqueId} />
    </div>
  </li>
);

export default ToggleBox;
