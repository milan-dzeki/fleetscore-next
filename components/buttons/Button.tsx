'use client';

import { useFormStatus } from 'react-dom';
import classes from '@/styles/components/buttons/button.module.scss';
import Spinner from '../loaders/Spinner';

interface Props {
  type: 'button' | 'submit';
  text: string;
  disabled?: boolean;
}

const Button = ({ type, text, disabled = false }: Props) => {
  const { pending } = useFormStatus();
  return (
    <button type={type} disabled={disabled || pending} className={classes.button}>
      {pending ? <Spinner /> : text}
    </button>
  );
};

export default Button;