export interface NotificationType {
  id: string;
  type: 'danger' | 'success';
  text: string;
  isDisappearing?: boolean;
}

export interface NotificationsPosition  {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

export interface NotificationSliceStateType {
  position: NotificationsPosition | null,
  notifications: NotificationType[];
}