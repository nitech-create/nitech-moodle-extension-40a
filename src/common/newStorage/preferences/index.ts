import * as storage from '../storage.ts';
import type { Preferences } from '~/common/model/preferences.ts';
import { preferencesReducer } from './reducer.ts';
import type { PreferencesAction } from './action.ts';

const storageArea = 'local';

export const initialPreferences: Preferences = {
  removeForceDownload: {
    enabled: true,
  },
  replaceBreadcrumbCourseName: {
    enabled: true,
  },
  replaceNavigationCourseName: {
    enabled: true,
  },
  dashboardEventsCountdown: {
    enabled: true,
  },
  dashboardQuickCourseLinks: {
    enabled: true,
  },
  scormAutoCollapseToc: {
    enabled: true,
  },
  scormAutoPlay: {
    enabled: false,
  },
  loginAutoSubmit: {
    enabled: true,
  },
};
let cachedPreferences: Preferences | null = null;

export const getPreferences = async function (): Promise<Preferences> {
  if (cachedPreferences !== null) {
    return cachedPreferences;
  }

  const preferences = await storage.get('preferences', storageArea);
  cachedPreferences = preferences ?? initialPreferences;

  return cachedPreferences;
};

export const reduceAndSavePreferences = async function (
  action: PreferencesAction,
): Promise<void> {
  cachedPreferences = preferencesReducer(await getPreferences(), action);
  return storage.set(
    'preferences',
    cachedPreferences,
    storageArea,
  );
};
