/** @jsxImportSource preact */

// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';
import * as hooks from 'preact/hooks';
// @deno-types=npm:@types/lodash
import * as lodash from 'lodash';
import FeatureOptions from './FeatureOptions.tsx';

import { getOptions, storeOptionsByMerge } from '../../common/storage/options.ts';
import { FeatureOption, Options } from '../../common/options.ts';

interface AppProps {
  initialOptions: Options;
}

const App = (props: AppProps) => {
  const [options, setOptionsRaw] = hooks.useState(props.initialOptions);

  hooks.useEffect(() => {
    getOptions().then(setOptionsRaw);
  });
  const setFeatureOptions = (key: (keyof Options["features"]), value: Partial<FeatureOption>) => {
    const newPartialOption = lodash.defaults(value, options.features[key]) as FeatureOption;
    const newOptions = lodash.merge(options, { features: { [key]: newPartialOption } }) as Options;
    setOptionsRaw(newOptions);
    storeOptionsByMerge(newOptions);
  }

  return (
    <>
      <FeatureOptions
        options={options.features}
        setOptions={setFeatureOptions} />
    </>
  );
}

const renderApp = function (targetElement: HTMLElement) {
  getOptions().then((options) => {
    preact.render(<App initialOptions={options} />, targetElement);
  });
};

export { renderApp };
