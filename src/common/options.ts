interface FeatureOptionBase {
  enabled: boolean;
}

interface FeatureOption extends FeatureOptionBase {
  [key: string]: unknown;
}

interface Options {
  features: {
    [key: string]: FeatureOption;
  };
}

export type { FeatureOption, FeatureOptionBase, Options };
