'use client';

import { type ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { type AppStore, makeStore } from '.';

interface Props {
  children: ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;