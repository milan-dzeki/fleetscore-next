'use client';

import { useAppSelector } from '@/hooks/store';
import NotificationPopup from './NotiicationPopup';
import classes from '@/styles/components/notifications/notificationWrapper.module.scss';

const NotificationWrapper = () => {
  const { notifications, position } = useAppSelector((state) => state.notifications);

  if (notifications.length === 0 || !position) {
    return null;
  }

  return (
    <div className={`
      ${classes.wrapper} ${classes[`wrapper__${position.horizontal}`]} ${classes[`wrapper__${position.vertical}`]}
    `}>
      {notifications.map((notification) => (
        <NotificationPopup key={notification.id} notificatonData={notification} />
      ))}
    </div>
  );
};

export default NotificationWrapper