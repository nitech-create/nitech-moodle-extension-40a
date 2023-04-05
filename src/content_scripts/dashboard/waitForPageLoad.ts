import type { Feature } from '../common/types.ts';

interface Options {
  timeout: number;
}

/** ダッシュボードの内容が読み込まれるまで待つ */
const waitForPageLoad: Feature<Options, void> = {
  uniqueName: 'dashboard-wait-for-page-load',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /\/moodle40a\/my\/(index\.php)?/,
  loader: (options: Options) =>
    new Promise((resolve, reject) => {
      const startTime = Date.now();

      // WANTFIX: 登録コース数が0だと動かないかもしれない？
      const checkPageContent = () => {
        const loadingContent = document.querySelector(
          '#inst19090 div[data-region="paged-content-page"]',
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
    }),
};

export default waitForPageLoad;
