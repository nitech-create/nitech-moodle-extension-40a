interface Options {
  features: {
    allPages: {
      'all-pages-remove-force-download': {
        enabled: boolean;
      };
      'all-pages-replace-header-course-name': {
        enabled: boolean;
      };
      'all-pages-replace-navigation-texts': {
        enabled: boolean;
      };
    };
    dashboard: {
      'dashboard-events-countdown': {
        enabled: boolean;
      };
      'dashboard-quick-course-view': {
        enabled: boolean;
      };
    };
    scorm: {
      'scorm-collapse-toc': {
        enabled: boolean;
      };
    };
  };
}

const defaultValue: Options = {
  features: {
    allPages: {
      'all-pages-remove-force-download': {
        enabled: true,
      },
      'all-pages-replace-header-course-name': {
        enabled: true,
      },
      'all-pages-replace-navigation-texts': {
        enabled: true,
      },
    },
    dashboard: {
      'dashboard-events-countdown': {
        enabled: true,
      },
      'dashboard-quick-course-view': {
        enabled: true,
      },
    },
    scorm: {
      'scorm-collapse-toc': {
        enabled: true,
      },
    },
  },
}

export type { Options };

export { defaultValue };
