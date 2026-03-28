'use client';

import classes from '@/styles/components/buttons/iconButton.module.scss';

interface Props {
  text: string;
  Icon: JSX.Element;
  onClick: () => void;
  danger?: boolean;
}

const IconButton = ({ text, Icon, onClick, danger }: Props) => {
  return (
    <button
      type="button"
      className={`${classes.button} ${danger ? classes.buttonDanger : ''}`}
      onClick={onClick}
    >
      {Icon}
      <span className={classes.buttonText}>{text}</span>
    </button>
  );
};

export default IconButton;