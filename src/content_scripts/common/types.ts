/**
 * 独立した機能を表す;
 * NOTE: `loader` 以外は現状使われていませんが, 将来的な拡張のため
 *   設定することを推奨します
 */
export interface Feature<T, U> {
  /** 機能の一意な名前 */
  uniqueName: string;
  /** ホスト名がマッチ (または一致) した場合に実行される */
  hostnameFilter: RegExp | string;
  /** パス名がマッチ (または一致) した場合に実行される */
  pathnameFilter: RegExp | string;
  /** 依存する機能の `uniqueName` */
  dependencies?: (Feature<unknown, unknown>['uniqueName'])[];
  /** 機能の本体 (同期でも非同期でも良い) */
  loader: (options: T) => U | Promise<U>;
}
