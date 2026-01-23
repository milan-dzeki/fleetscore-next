import type { ReactNode } from 'react';
import classes from '@/styles/components/icons/iconWrapper.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function IconWrapper({
  children,
  className = '',
  onClick
}: Props) {
  if (onClick) {
    return (
      <button className={`${classes.icon} ${classes.iconBtn} ${className}`} type="button" onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <span className={`${className}`}>
      {children}
    </span>
  );
}

export default IconWrapper;