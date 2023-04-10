import type { Feature } from '../common/types.ts';

type WaitForPageLoadOptions = {
  enabled: boolean;
  timeout: number;
};

/** ダッシュボードの内容が読み込まれるまで待つ */
const waitForPageLoad: Feature<WaitForPageLoadOptions> = {
  uniqueName: 'dashboard-wait-for-page-load',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /^\/moodle40a\/my\/(index\.php)?$/,
  propagateError: false,
  defaultOption: {
    enabled: true,
    timeout: 5000,
  },
  loader: (options) => {
    if (!options.enabled) {
      return;
    }

    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      // WANTFIX: 登録コース数が0だと動かないかもしれない？
      const checkPageContent = () => {
        const loadingContent = document.querySelector(
          'section.block_myoverview div[data-region="paged-content-page"]',
        );

        if (loadingContent !== null) {
          resolve();
        } else {
          const timePassed = Date.now() - startTime;

          if (timePassed > options.timeout) {
            reject(Error(`[${waitForPageLoad.uniqueName}] timeout`));
          } else {
            setTimeout(checkPageContent, 100);
          }
        }
      };

      checkPageContent();
    });
  },
};

export default waitForPageLoad;
