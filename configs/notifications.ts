import type { NotificationsPosition } from '@/types/store/slices/notificationSlice';

export const NOTIFICATIONS_DEFAULT_POSITION: NotificationsPosition = {
  horizontal: 'left',
  vertical: 'bottom'
} as const;