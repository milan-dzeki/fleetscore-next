'use client';

import { useState, useEffect, useCallback } from 'react';
import type { NotificationType } from '@/types/store/slices/notificationSlice';
import { useAppDispatch } from '@/hooks/store';
import { clearNotification } from '@/store/slices/notificationsSlice';
import XFatIcon from '../icons/XFatIcon';
import classes from '@/styles/components/notifications/notificationPopup.module.scss';
import ExclamationCircleEmptyIcon from '../icons/ExclamationCircleEmptyIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';

interface Props {
  notificatonData: NotificationType;
}

const NotificationPopup = ({ notificatonData }: Props) => {
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(1);

  const onClear = useCallback((): void => {
    dispatch(clearNotification({ id: notificatonData.id }));
  }, [dispatch, notificatonData.id]);

  useEffect(() => {
    if (notificatonData.isDisappearing && progress > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 1;
          }
          return prev - 0.02;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [notificatonData.isDisappearing, progress]);

  useEffect(() => {
    if (progress <= 0) {
      onClear();
    }
  }, [progress, onClear]);

  return (
    <div className={`${classes.notification} ${classes[`notification__${notificatonData.type}`]}`}>
      <div className={classes.notificationContent}>
        <div className={classes.notificationContentInfo}>
          {notificatonData.type === 'danger' ? <ExclamationCircleEmptyIcon color="white" /> : <CheckCircleIcon color="white" />}
          <p className={classes.notificationText}>
            {notificatonData.text}
          </p>
        </div>
        <XFatIcon color="white" onClick={onClear} />
      </div>
      {notificatonData.isDisappearing && (
        <div className={classes.notificationProgress} style={{ transform: `scaleX(${progress})` }} />
      )}
    </div>
  );
};

export default NotificationPopup;