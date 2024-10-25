import { isDebug } from 'esbuild-plugin-debug-switch';

import { getPreferences } from '~/common/newStorage/preferences/index.ts';

const parseUrl = function (url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

const forceDownloadRemoved = function (url: URL): URL {
  const removed = new URL(url);
  removed.searchParams.delete('forcedownload', '1');

  return removed;
};

const debounce = function (callback: () => void, timeout: number): () => void {
  let timer: number | undefined = undefined;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, timeout);
  };
};

(async () => {
  const preferences = await getPreferences();
  if (!preferences.removeForceDownload.enabled) {
    return;
  }

  if (isDebug) {
    console.log('RemoveForceDownload is enabled.');
  }

  const removeForceDownload = () => {
    if (isDebug) {
      console.log('Removing forcedownload');
    }

    document.querySelectorAll('a').forEach((link) => {
      const url = parseUrl(link.href);
      if (url === null) return;

      link.href = forceDownloadRemoved(url).toString();
    });
  };
  removeForceDownload();

  const observer = new MutationObserver(
    debounce(removeForceDownload, 500),
  );
  observer.observe(document.body, { childList: true });
})();
