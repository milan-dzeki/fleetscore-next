'use client';

import { type ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { type AppStore, makeStore } from '.';
import { UserSliceIntialStateType } from '@/types/store/slices/userSlice';

interface Props {
  children: ReactNode;
  initialUser?: UserSliceIntialStateType['data'];
}

const StoreProvider = ({ children, initialUser = null }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore({
      user: {
        loading: false,
        error: null,
        data: initialUser
      }
    });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;