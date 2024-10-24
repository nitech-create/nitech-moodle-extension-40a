export type PatchRemoveForceDownloadAction = {
  type: 'patchRemoveForceDownload';
  payload: {
    enabled?: boolean;
  };
};

export type PatchReplaceBreadcrumbCourseNameAction = {
  type: 'patchReplaceBreadcrumbCourseName';
  payload: {
    enabled?: boolean;
  };
};

export type PatchReplaceNavigationCourseNameAction = {
  type: 'patchReplaceNavigationCourseName';
  payload: {
    enabled?: boolean;
  };
};

export type PatchDashboardEventsCountdownAction = {
  type: 'patchDashboardEventsCountdown';
  payload: {
    enabled?: boolean;
  };
};

export type PatchDashboardQuickCourseLinksAction = {
  type: 'patchDashboardQuickCourseLinks';
  payload: {
    enabled?: boolean;
  };
};

export type PatchScormCollapseTocAction = {
  type: 'patchScormCollapseToc';
  payload: {
    enabled?: boolean;
  };
};

export type PatchScormAutoPlayAction = {
  type: 'patchScormAutoPlay';
  payload: {
    enabled?: boolean;
  };
};

export type PatchLoginAutoSubmitAction = {
  type: 'patchLoginAutoSubmit';
  payload: {
    enabled?: boolean;
  };
};

export type PreferencesAction =
  | PatchRemoveForceDownloadAction
  | PatchReplaceBreadcrumbCourseNameAction
  | PatchReplaceNavigationCourseNameAction
  | PatchDashboardEventsCountdownAction
  | PatchDashboardQuickCourseLinksAction
  | PatchScormCollapseTocAction
  | PatchScormAutoPlayAction
  | PatchLoginAutoSubmitAction;
