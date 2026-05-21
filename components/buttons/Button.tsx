'use client';

import { useFormStatus } from 'react-dom';
import classes from '@/styles/components/buttons/button.module.scss';
import Spinner from '../loaders/Spinner';

interface Props {
  type: 'button' | 'submit';
  text: string;
  display?: 'block' | 'inlineBlock';
  hasBorder?: boolean;
  danger?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  noHoverChanges?: boolean;
}

const Button = ({
  type,
  text,
  disabled = false,
  display = 'block',
  danger = false,
  hasBorder = true,
  noHoverChanges = false,
  onClick = () => { return; }
}: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      type={type}
      disabled={disabled || pending}
      className={`
        ${classes.button}
        ${classes[`button--${display}`]}
        ${!hasBorder ? classes['button--borderless'] : ''}
        ${danger ? classes[`button--danger`] : ''}
        ${noHoverChanges ? classes['button--noHover'] : ''}
      `}
      onClick={onClick}
    >
      {pending ? <Spinner /> : text}
    </button>
  );
};

export default Button;