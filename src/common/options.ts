interface FeatureOption {
  enabled: boolean;
  [key: string]: unknown;
}

interface Options {
  features: {
    [key: string]: FeatureOption;
  };
}

const defaultFeatureOption = {
  enabled: true,
};

export type { FeatureOption, Options };

export { defaultFeatureOption };
