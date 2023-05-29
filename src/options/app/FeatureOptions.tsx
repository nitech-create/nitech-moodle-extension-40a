import * as preact from 'preact';
import { FeatureOption, Options } from '../../common/options.ts';
import optionText from './optionText.json' assert { type: 'json' };

import ToggleBox from './ToggleBox.tsx';

interface FeatureOptionsProps {
  options: Options['features'];
  setOptions: (
    key: keyof Options['features'],
    value: Partial<FeatureOption>,
  ) => void;
}

const FeatureOptions = (props: FeatureOptionsProps) => {
  const featureUniqueNames = Object.keys(props.options)
    .filter((
      uniqName,
    ) => (uniqName in optionText.features)) as (keyof typeof optionText[
      'features'
    ])[];

  return (
    <section>
      <h2>機能設定</h2>

      <ul>
        {featureUniqueNames.map((uniqueName) => (
          <ToggleBox
            uniqueId={`features-${uniqueName}`}
            labelText={optionText['features'][uniqueName]['_category']}
            checked={props.options[uniqueName].enabled}
            onClick={() => {
              props.setOptions(uniqueName, {
                enabled: !props.options[uniqueName].enabled,
              });
            }}
          />
        ))}
      </ul>
    </section>
  );
};

export default FeatureOptions;
