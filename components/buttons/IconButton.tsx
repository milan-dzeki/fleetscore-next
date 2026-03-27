'use client';

import classes from '@/styles/components/buttons/iconButton.module.scss';

interface Props {
  text: string;
  Icon: JSX.Element;
  danger?: boolean;
}

const IconButton = ({ text, Icon, danger }: Props) => {
  return (
    <button type="button" className={`${classes.button} ${danger ? classes.buttonDanger : ''}`}>
      {Icon}
      <span className={classes.buttonText}>{text}</span>
    </button>
  );
};

export default IconButton;