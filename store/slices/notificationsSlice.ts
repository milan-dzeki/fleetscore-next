import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationSliceStateType } from '@/types/store/slices/notificationSlice';
import { NOTIFICATIONS_DEFAULT_POSITION } from '@/configs/notifications';

const initialState: NotificationSliceStateType = {
  position: null,
  notifications: []
};

const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications (
      state, 
      action: PayloadAction<{
        notifications: NotificationSliceStateType['notifications'];
        position?: NotificationSliceStateType['position']
      }>
    ) {
      state.notifications.push(...action.payload.notifications)
      state.position = action.payload.position || NOTIFICATIONS_DEFAULT_POSITION;
    },
    clearNotification (state, action: PayloadAction<{ id: string }>) {
      state.notifications = state.notifications
        .filter((notification) => notification.id !== action.payload.id);
    }
  }
});

export const { setNotifications, clearNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;