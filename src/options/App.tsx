/** @jsxImportSource preact */

// @deno-types=https://raw.githubusercontent.com/preactjs/preact/10.13.2/src/index.d.ts
import * as preact from 'preact';

const App = () => (
  <section>
    <h2>機能設定</h2>

    <section>
      <h3>すべてのページ</h3>

      <ul>
        <li>
          <div className='label'>
            <label htmlFor='all-pages-remove-force-download'>
              強制ダウンロードリンクの非強制化
            </label>
          </div>
          <div className='control'>
            <input type='checkbox' id='all-pages-remove-force-download' />
            <label htmlFor='all-pages-remove-force-download' />
          </div>
        </li>
        <li>
          <div className='label'>
            <label htmlFor='all-pages-replace-header-course-name'>
              ヘッダーの短縮コース名の置き換え
            </label>
          </div>
          <div className='control'>
            <input type='checkbox' id='all-pages-replace-header-course-name' />
            <label htmlFor='all-pages-replace-header-course-name' />
          </div>
        </li>
        <li>
          <div className='label'>
            <label htmlFor='all-pages-replace-navigation-texts'>
              ナビゲーションの短縮コース名の置き換え
            </label>
          </div>
          <div className='control'>
            <input type='checkbox' id='all-pages-replace-navigation-texts' />
            <label htmlFor='all-pages-replace-navigation-texts' />
          </div>
        </li>
      </ul>
    </section>

    <section>
      <h3>ダッシュボード</h3>
      <ul>
        <li>
          <div className='label'>
            <label htmlFor='dashboard-events-countdown'>
              直近イベントにカウントダウンを表示
            </label>
          </div>
          <div className='control'>
            <input type='checkbox' id='dashboard-events-countdown' />
            <label htmlFor='dashboard-events-countdown' />
          </div>
        </li>
        <li>
          <div className='label'>
            <label htmlFor='dashboard-quick-course-view'>
              コースへのショートカットを追加
            </label>
          </div>
          <div className='control'>
            <input type='checkbox' id='dashboard-quick-course-view' />
            <label htmlFor='dashboard-quick-course-view' />
          </div>
        </li>
      </ul>
    </section>

    <section>
      <h3>SCORM 動画視聴ページ</h3>
      <ul>
        <li>
          <div className='label'>
            <label htmlFor='scorm-collapse-toc'>
              動画の目次を折りたたむ
            </label>
          </div>
          <div className='control'>
            <input type='checkbox' id='scorm-collapse-toc' />
            <label htmlFor='scorm-collapse-toc' />
          </div>
        </li>
      </ul>
    </section>
  </section>
);

const renderApp = function (targetElement: HTMLElement) {
  preact.render(<App />, targetElement);
};

export { renderApp };
