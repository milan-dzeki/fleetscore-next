'use client';

import classes from '@/styles/components/inputs/textInput.module.scss';

interface Props {
  data: {
    attributes: {
      type: 'text' | 'email' | 'password';
      id: string;
      name: string;
      placeholder: string;
    };
    label: string;
    focused: boolean;
    touched: boolean;
    valid: boolean;
    value: string;
  };
}

function TextInput({
  data: {
    attributes,
    label,
    value
  }
}: Props) {
  return (
    <div className={classes.input}>
      <label className={`${classes.inputLabel} ${value.trim() &&  classes.inputLabel_visible}`} htmlFor={attributes.id}>
        {label}
      </label>
      <input
        type={attributes.type}
        id={attributes.id}
        name={attributes.name}
        value={value}
        onChange={() => {}}
      />
    </div>
  );
}

export default TextInput;