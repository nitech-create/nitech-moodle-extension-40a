import type { Feature } from '../common/types.ts';
import { getOptions } from '../../common/storage/options.ts';

type UniqueName = Feature['uniqueName'];

/** feature を依存関係に従ってトポロジカルソートする */
// DFS を用いて探索
const sortFeatures = function (features: Feature[]) {
  // 重複チェック
  const featureNames = features.map((feature) => feature.uniqueName);
  if (new Set(featureNames).size !== features.length) {
    throw Error(
      `Multiple features has the same unique name or features duplicated`,
    );
  }

  const featureNameMap = new Map<UniqueName, Feature>();
  for (const feature of features) {
    featureNameMap.set(feature.uniqueName, feature);
  }

  const visited = new Set<UniqueName>();
  const result: Feature[] = [];
  const visit = function (feature: Feature, localVisited: Set<UniqueName>) {
    if (visited.has(feature.uniqueName)) {
      return;
    }
    if (localVisited.has(feature.uniqueName)) {
      throw Error(
        `Circular dependency detected on resolving feature ${feature.uniqueName}`,
      );
    }

    visited.add(feature.uniqueName);
    localVisited.add(feature.uniqueName);

    for (const depFeatureName of feature.dependencies ?? []) {
      const depFeature = featureNameMap.get(depFeatureName);
      if (!depFeature) {
        throw Error(
          `Feature ${depFeatureName} is not provided to feature loader`,
        );
      }
      visit(depFeature, localVisited);
    }

    result.push(feature);
  };

  for (const feature of features) {
    visit(feature, new Set());
  }

  return result;
};

/**
 * 文字列か正規表現で対象文字列をテストする;
 * `test` が文字列の場合は完全一致, 正規表現の場合は `RegExp.test` の結果
 */
const testByStringOrRegExp = function (test: string | RegExp, target: string) {
  if (typeof test === 'string') {
    return test === target;
  } else if (test instanceof RegExp) {
    return test.test(target);
  }
  return false;
};

/** `Feature` を依存関係を解決しながら読み込む */
const loadFeature = async function (
  features: Feature[],
  contextUrl: URL,
  showLog = false,
) {
  const options = await getOptions();
  const contextHost = contextUrl.hostname;
  const contextPath = contextUrl.pathname;
  // ここで URL のフィルターをかけたほうが処理量は減るが、
  // 特定のページでのみ依存関係の解決に失敗するとバグの発見がしづらいため
  // 実行時に URL をチェックする
  const sortedFeatures = sortFeatures(features);
  const loaderPromiseMap = new Map<UniqueName, Promise<void>>();

  const rootPromiseEventTarget = new EventTarget();
  const rootPromise = new Promise<void>((resolve) => {
    rootPromiseEventTarget.addEventListener('start', () => resolve());
  });

  for (const feature of sortedFeatures) {
    const depFeaturePromises = (feature.dependencies ?? []).map((name) =>
      loaderPromiseMap.get(name)
    );
    if (depFeaturePromises.some((v) => v === undefined)) {
      throw Error(
        `Failed to resolve feature ${feature.uniqueName}: dependency feature does not exist`,
      );
    }

    if (depFeaturePromises.length === 0) {
      depFeaturePromises.push(rootPromise);
    }

    // 各 Feature を実行する Promise を作成
    loaderPromiseMap.set(
      feature.uniqueName,
      Promise.all(depFeaturePromises).then(() => {
        if (!testByStringOrRegExp(feature.hostnameFilter, contextHost)) {
          if (showLog) {
            console.log(
              `[FeatureLoader] Skipping ${feature.uniqueName}: hostname does not match`,
            );
          }
          return;
        }
        if (!testByStringOrRegExp(feature.pathnameFilter, contextPath)) {
          if (showLog) {
            console.log(
              `[FeatureLoader] Skipping ${feature.uniqueName}: pathname does not match`,
            );
          }
          return;
        }

        if (showLog) {
          console.log(`[FeatureLoader] Loading ${feature.uniqueName}`);
        }

        const option = options.features[feature.uniqueName];

        if (feature.propagateError === false) {
          // 失敗しても警告として出力するだけ
          return Promise.resolve(feature.loader(option)).catch((err: unknown) => {
            console.warn(
              `Uncaught error in feature loader ${feature.uniqueName}: `,
              err,
            );
          });
        }

        return Promise.resolve(feature.loader(option)).catch((err: unknown) => {
          return Promise.reject(Error(
            `Uncaught error in feature loader ${feature.uniqueName}`,
            { cause: err },
          ));
        });
      }),
    );
  }

  rootPromiseEventTarget.dispatchEvent(new CustomEvent('start'));
  await Promise.all(loaderPromiseMap.values());
};

export default loadFeature;
