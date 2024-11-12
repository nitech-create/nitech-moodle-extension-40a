import * as preact from "preact";

import { usePreferences } from "../hooks/usePreferences.ts";

const PreferencesItem = function (props: {
  checked: boolean;
  onClick: preact.JSX.MouseEventHandler<HTMLInputElement>;
  children: preact.ComponentChildren;
}) {
  return (
    <li>
      <label>
        <div>{props.children}</div>
        <input
          type="checkbox"
          checked={props.checked}
          onClick={props.onClick}
        />
      </label>
    </li>
  );
};

export const EditPreferences = function () {
  const preferences = usePreferences();

  if (!preferences) {
    return <div>loading...</div>;
  }

  return (
    <>
      <section className="preference-group">
        <h3>全てのページ</h3>
        <ul>
          <PreferencesItem
            checked={preferences.removeForceDownload.enabled}
            onClick={(e) =>
              preferences.setRemoveForceDownload({
                enabled: e.currentTarget.checked,
              })
            }
          >
            <p className="title">リンクの強制ダウンロードを無効化する</p>
            <p className="description">
              {/* 改行が気持ち悪いが formatter のバグで無視できないので一旦放置 */}
              moodle では PDF
              などのリンクに強制的にダウンロードさせるように設定することができます。
              この設定により PDF
              などがブラウザの規定の動作で開かずダウンロードされてしまうのを防ぎます。
            </p>
          </PreferencesItem>
          <PreferencesItem
            checked={preferences.replaceBreadcrumbCourseName.enabled}
            onClick={(e) =>
              preferences.setReplaceBreadcrumbCourseName({
                enabled: e.currentTarget.checked,
              })
            }
          >
            <p className="title">
              ヘッダーナビゲーションのコース名をわかりやすい名前にする
            </p>
            <p className="description">
              各ページのヘッダーにある現在のページの位置を表すリンクのテキストをわかりやすい名前に置き換えます。
            </p>
          </PreferencesItem>
          <PreferencesItem
            checked={preferences.replaceNavigationCourseName.enabled}
            onClick={(e) =>
              preferences.setReplaceNavigationCourseName({
                enabled: e.currentTarget.checked,
              })
            }
          >
            <p className="title">
              ナビゲーションのコース名をわかりやすい名前にする
            </p>
            <p className="description">
              各ページにあるナビゲーションメニューにおいて、コースリンクのテキストをわかりやすい名前に置き換えます。
            </p>
          </PreferencesItem>
        </ul>
      </section>

      <section className="preference-group">
        <h3>ダッシュボード</h3>
        <ul>
          <PreferencesItem
            checked={preferences.dashboardQuickCourseLinks.enabled}
            onClick={(e) =>
              preferences.setDashboardQuickCourseLinks({
                enabled: e.currentTarget.checked,
              })
            }
          >
            <p className="title">
              開講中のコースにアクセスしやすくするメニューを表示する
              (QuickCourseLinks)
            </p>
            <p className="description">
              ダッシュボードに現在開講しているコースを曜日・時間順に表示するクイックメニューを表示します。
            </p>
          </PreferencesItem>
          <PreferencesItem
            checked={preferences.dashboardQuickCourseLinksForBachelor.enabled}
            onClick={(e) => {
              console.log("Hello!Bachelor!");
              preferences.setDashboardQuickCourseLinks({
                enabled: e.currentTarget.checked,
              });
            }}
          >
            <p className="title">
              クイックメニューを学部生用にする (QuickCourseLinks for Bachelor)
            </p>
            <p className="description">大学院生用のクオーターを無くす。</p>
          </PreferencesItem>
          <PreferencesItem
            checked={preferences.dashboardEventsCountdown.enabled}
            onClick={(e) =>
              preferences.setDashboardEventsCountdown({
                enabled: e.currentTarget.checked,
              })
            }
          >
            <p className="title">直近イベントに残り時間を表示する</p>
            <p className="description">
              ダッシュボードにある課題などが表示される「直近イベント」において、表示されているイベントの残り時間を表示します。
              この残り時間はリアルタイムでカウントダウンされます
              (表示中に終了時刻が変わった場合はページの再読み込みが必要です)。
            </p>
          </PreferencesItem>
        </ul>
      </section>

      <section className="preference-group">
        <h3>動画ページ</h3>
        <ul>
          <PreferencesItem
            checked={preferences.scormAutoCollapseToc.enabled}
            onClick={(e) =>
              preferences.setScormAutoCollapseToc({
                enabled: e.currentTarget.checked,
              })
            }
          >
            <p className="title">ページを開いたときに目次を折りたたむ</p>
            <p className="description">
              動画ページに表示される目次をデフォルトで折りたたみます。
              画面上により大きく動画を表示することができます。
            </p>
          </PreferencesItem>
        </ul>
      </section>
    </>
  );
};
