'use client';

import { useState } from 'react';
import classes from '@/styles/components/inputs/inputErrorMsg.module.scss';
import ExclamationCircleEmptyIcon from '../icons/ExclamationCircleEmptyIcon';
import XFatIcon from '../icons/XFatIcon';

interface Props {
  visible: boolean;
  text: string;
}

const InputErrorMsg = ({ visible, text }: Props) => {
  const [show, setShow] = useState(true);

  const onHide = () => {
    setShow(false);
  };

  return (
    <div className={`${classes.error} ${show && visible ? classes.errorShow : ''}`}>
      <div className={classes.errorContent}>
        <div className={classes.errorPointer} />
        <div className={classes.errorNotice}>
          <ExclamationCircleEmptyIcon color="errorRed" />
          <span className={classes.errorText}>{text}</span>
        </div>
        <XFatIcon onClick={onHide} color="errorRed" />
      </div>
    </div>
  );
};

export default InputErrorMsg;