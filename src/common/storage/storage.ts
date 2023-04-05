import browser from 'webextension-polyfill';
import type { Course } from './course.ts';

/** `storage["local" | "managed" | "sync"]` に保存されている値の型 */
interface StoredValue {
  courses: Course[],
}

type StorageArea = 'local' | 'managed' | 'sync';

const defaultValue: StoredValue = {
  courses: []
};

/** ストレージから値を取得 */
const get = async function<Key extends keyof StoredValue>(
  key: Key,
  storageArea: StorageArea = 'local'
): Promise<StoredValue[Key]> {
  const value = await browser.storage[storageArea].get(key);

  console.log(`[storage get]: ${key}`, value);

  return value?.[key] ?? defaultValue[key];
}

/** 最後に作成された (Promise-chain の最後尾の) `Promise` */
let lastPromise: Promise<unknown> = Promise.resolve();
/**
 * ストレージに保存されている値を更新する;
 * 複数に同時の非同期更新が起こらないことを保証する
 */
const update = async function<Key extends keyof StoredValue>(
  key: Key,
  reducer: (prev: StoredValue[Key]) => StoredValue[Key],
  storageArea: StorageArea = 'local'
) {
  const storeValue = () => new Promise<void>((resolve) => {
    get(key).then((prevValue) => {
      browser.storage[storageArea].set({
        [key]: reducer(prevValue)
      });
      resolve();
    });
  });

  lastPromise = lastPromise.then(storeValue);
  await lastPromise;
}

export { get, update };
