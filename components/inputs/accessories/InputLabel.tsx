import { type FC } from 'react';
import classes from '@/styles/components/inputs/accessories/inputLabel.module.scss';

interface Props {
  visible: boolean;
  htmlFor: string;
  text: string;
}

const InputLabel: FC<Props> = ({ visible, htmlFor, text }) => {
  return (
    <label
      className={`
        ${classes.label} ${visible && classes.labelVisible}
      `}
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
};

export default InputLabel;