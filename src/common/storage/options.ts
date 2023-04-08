// @deno-types=npm:@types/lodash
import * as lodash from 'lodash';
import * as storage from './storage.ts';
import { defaultValue, Options } from '../options.ts';

const storageOptionsKey = 'options';

const getOptions = async function () {
  return await storage.get(storageOptionsKey);
};

const storeOptionsByMerge = async function (options: Partial<Options>) {
  await storage.update(storageOptionsKey, (prevOptions) => {
    return lodash.merge(prevOptions, options);
  });
};

export type { Options };

export { getOptions, storeOptionsByMerge };
