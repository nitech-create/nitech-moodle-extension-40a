import type { Feature } from "../common/types.ts";

interface Options {
  timeout: number
}

/** ダッシュボードの内容が読み込まれるまで待つ */
const waitForPageLoad: Feature<Options, void> = {
  uniqueName: 'dashboard-wait-for-page-load',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /\/moodle40a\/my\/(index\.php)?/,
  loader: (options: Options) => new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkPageContent = () => {
      const loadingContent = document.querySelector('div[data-region="loading-placeholder-content"]');

      if(loadingContent === null) {
        resolve();
      } else {
        const timePassed = Date.now() - startTime;

        if(timePassed > options.timeout) {
          reject(Error(`[${waitForPageLoad.uniqueName}] timeout`));
        } else {
          setTimeout(checkPageContent, 100);
        }
      }
    }

    checkPageContent();
  }),
}

export default waitForPageLoad;
