import type { ReactNode } from 'react';
import type { IconPropsType } from '@/types/props/common';
import classes from '@/styles/components/icons/iconWrapper.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

function IconWrapper({
  children,
  size = 'small',
  color = 'default',
  className = '',
  onClick
}: Props & IconPropsType) {
  const classNames = `
    ${classes.icon}
    ${classes[`icon_${size}`]}
    ${classes[`icon_${color}`]}
    ${className}
  `;
  if (onClick) {
    return (
      <button
        className={`
          ${classNames}
          ${classes.iconBtn}
        `}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={classNames}>
      {children}
    </span>
  );
}

export default IconWrapper;