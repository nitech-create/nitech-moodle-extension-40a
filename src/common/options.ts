interface FeatureOption {
  enabled: boolean;
  [key: string]: unknown;
}

interface Options {
  features: {
    [key: string]: FeatureOption;
  };
}

const defaultValue: Options = {
  features: {
    'all-pages-remove-force-download': {
      enabled: true,
    },
    'all-pages-replace-header-course-name': {
      enabled: true,
    },
    'all-pages-replace-navigation-texts': {
      enabled: true,
    },
    'dashboard-events-countdown': {
      enabled: true,
    },
    'dashboard-quick-course-view': {
      enabled: true,
    },
    'dashboard-update-course-repository': {
      enabled: true,
    },
    'dashboard-wait-for-page-load': {
      enabled: true,
      timeout: 5000,
    },
    'scorm-collapse-toc': {
      enabled: true,
    },
  },
};

export type { FeatureOption, Options };

export { defaultValue };
