import { type MutableRefObject, useEffect } from 'react';

export const useOutsideClick = <E extends HTMLElement>(elementRef: MutableRefObject<E | null>, onCloseFn: () => void, dropdownOpen?: boolean) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownOpen !== undefined && !dropdownOpen) {
        return;
      }
      const refEl = elementRef?.current;

      if (!refEl || refEl.contains(event.target as Node)) {
        return;
      }

      onCloseFn();
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [elementRef, onCloseFn, dropdownOpen]);
};