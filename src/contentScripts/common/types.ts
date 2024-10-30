import { FeatureOption } from "../../common/options.ts";

export type FeatureUniqueName = string;

/**
 * 独立した機能を表す
 */
export interface Feature {
  /** 機能の一意な名前 */
  uniqueName: FeatureUniqueName;
  /** ホスト名がマッチ (または一致) した場合に実行される */
  hostnameFilter: RegExp | string;
  /** パス名がマッチ (または一致) した場合に実行される */
  pathnameFilter: RegExp | string;
  /** 依存する機能の `uniqueName` */
  dependencies?: FeatureUniqueName[];
  /** 機能の本体 (同期でも非同期でも良い) */
  loader: (options: Required<FeatureOption>) => void | Promise<void>;
  /** エラーを伝播するかどうか (デフォルト: `true`) */
  propagateError?: boolean;
}
