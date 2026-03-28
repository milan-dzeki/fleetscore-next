'use client';

import classes from '@/styles/components/modals/backdrop.module.scss';

interface Props {
  show: boolean;
}

const Backdrop = ({ show }: Props) => {
  return (
    <div className={`${classes.backdrop} ${show ? classes.backdropShow : ''}`} />
  );
};

export default Backdrop;