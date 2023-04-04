export interface Feature<T, U> {
  uniqueName: string;
  hostnameFilter: RegExp | string;
  pathnameFilter: RegExp | string;
  dependencies?: (Feature<unknown, unknown>['uniqueName'])[];
  loader: (options: T) => Promise<U>;
}
