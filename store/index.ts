import { configureStore } from '@reduxjs/toolkit';
import type { UserSliceIntialStateType } from '@/types/store/slices/userSlice';
import userReducer from './slices/userSlice';
import notificationsReducer from './slices/notificationsSlice';

export const makeStore = (preloadedState?: { user: UserSliceIntialStateType; }) => {
  return configureStore({
    reducer: {
      user: userReducer,
      notifications: notificationsReducer
    },
    preloadedState
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];