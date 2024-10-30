import { debounceCallback } from "~/common/debounceCallback.ts";

export type RegisterMutationObserverCallbackOptions = {
  rootElement: HTMLElement;
  observerOptions: MutationObserverInit;
  debounceTimeout?: number;
};

export const registerMutationObserverCallback = function (
  callback: MutationCallback,
  options: RegisterMutationObserverCallbackOptions,
) {
  const debounceTimeout = options?.debounceTimeout ?? 500;

  const observer = new MutationObserver(
    debounceCallback(callback, debounceTimeout),
  );
  observer.observe(options.rootElement, options.observerOptions);
};
