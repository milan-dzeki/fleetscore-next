import type { ReactNode } from 'react';
import classes from '@/styles/components/boxes/textBox.module.scss';

interface Props {
  text: string | ReactNode;
  textAlign?: 'center' | 'left' |' right';
}

const TextBox = ({
  text,
  textAlign = 'left'
}: Props) => {
  return (
    <div className={`${classes.textBox} ${classes[`textBox_${textAlign}`]}`}>
      {typeof text === 'string' ? (
        <p>{text}</p>
      ) : text}
    </div>
  );
};

export default TextBox;