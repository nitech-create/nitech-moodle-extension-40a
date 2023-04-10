import type { Feature } from '../common/types.ts';

type RemoveForceDownloadOptions = {
  enabled: boolean;
};

/** 強制ダウンロードのリンクをブラウザで開くようにする */
const removeForceDownload: Feature<RemoveForceDownloadOptions> = {
  uniqueName: 'all-pages-remove-force-download',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /^\/moodle40a\//,
  defaultOption: {
    enabled: true,
  },
  loader: async (options) => {
    if (!options.enabled) {
      return;
    }

    // 読み込み待ちのため遅延を入れる
    await new Promise((resolve) => setTimeout(resolve, 1000));

    document.querySelectorAll('a').forEach((link) => {
      link.href = link.href.replace('forcedownload=1', '');
    });
  },
};

export default removeForceDownload;
