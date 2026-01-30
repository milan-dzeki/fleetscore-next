import { configureStore } from '@reduxjs/toolkit';
import type { UserSliceIntialStateType } from '@/types/store/slices/userSlice';
import userReducer from './slices/userSlice';

export const makeStore = (preloadedState?: { user: UserSliceIntialStateType; }) => {
  return configureStore({
    reducer: {
      user: userReducer
    },
    preloadedState
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];