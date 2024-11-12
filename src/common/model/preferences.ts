export type Preferences = {
  // features for all pages
  removeForceDownload: {
    enabled: boolean;
  };
  replaceBreadcrumbCourseName: {
    enabled: boolean;
  };
  replaceNavigationCourseName: {
    enabled: boolean;
  };

  // features for dashboard page
  dashboardQuickCourseLinks: {
    enabled: boolean;
  };
  dashboardQuickCourseLinksForBachelor: {
    enabled: boolean;
  };
  dashboardEventsCountdown: {
    enabled: boolean;
  };

  // video page
  scormAutoCollapseToc: {
    enabled: boolean;
  };
  scormAutoPlay: {
    enabled: boolean;
  };

  // login page
  loginAutoSubmit: {
    enabled: boolean;
  };
};
