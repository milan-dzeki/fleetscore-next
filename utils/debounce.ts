/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyFn = (...args: any[]) => void;

export function debounce <T extends AnyFn>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), wait);
  }
};