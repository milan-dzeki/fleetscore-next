import type { ReactNode } from 'react';
import classes from '@/styles/components/boxes/textBox.module.scss';

interface Props {
  text?: string | ReactNode;
  textAlign?: 'center' | 'left' |' right';
  children?: ReactNode;
  childrenFlex?: boolean;
}

const TextBox = ({
  text,
  textAlign = 'left',
  children,
  childrenFlex = false
}: Props) => {
  return (
    <div className={`${classes.textBox} ${classes[`textBox_${textAlign}`]} ${childrenFlex ? classes.textBoxFlex : ''}`}>
      {typeof text === 'string' && text && !children ? (
        <p>{text}</p>
      ) : text}
      {!text && children && children}
    </div>
  );
};

export default TextBox;