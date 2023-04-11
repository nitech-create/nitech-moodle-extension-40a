import browser from 'webextension-polyfill';
// @deno-types=npm:@types/lodash
import * as lodash from 'lodash';
import type { Course } from '../course.ts';
import { Options } from '../options.ts';

/** `storage["local" | "managed" | "sync"]` に保存されている値の型 */
interface StoredValue {
  courses: Course[];
  options: Options;
}

type StorageArea = 'local' | 'managed' | 'sync';

const defaultValue: StoredValue = {
  courses: [],
  options: {
    features: {},
  },
};

/** ストレージから値を取得 */
const get = async function <Key extends keyof StoredValue>(
  key: Key,
  storageArea: StorageArea = 'local',
): Promise<StoredValue[Key]> {
  const value = await browser.storage[storageArea].get(key) as Partial<
    StoredValue
  >;

  return lodash.defaults(value, defaultValue)[key];
};

/** 最後に作成された (Promise-chain の最後尾の) `Promise` */
let lastPromise: Promise<unknown> = Promise.resolve();
/**
 * ストレージに保存されている値を更新する;
 * 複数に同時の非同期更新が起こらないことを保証する
 */
const update = async function <Key extends keyof StoredValue>(
  key: Key,
  reducer: (prev: StoredValue[Key]) => StoredValue[Key],
  storageArea: StorageArea = 'local',
) {
  const storeValue = () =>
    new Promise<void>((resolve) => {
      get(key).then((prevValue) => {
        browser.storage[storageArea].set({
          [key]: reducer(lodash.defaults(prevValue, defaultValue[key])),
        });
        resolve();
      });
    });

  lastPromise = lastPromise.then(storeValue);
  await lastPromise;
};

export { get, update };
