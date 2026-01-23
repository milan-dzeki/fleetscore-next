'use client';

import {
  type FocusEventHandler,
  type ChangeEventHandler,
  useCallback
} from 'react';
import type { TextInputType } from '@/types/inputs';
import XFatIcon from '../icons/XFatIcon';
import InputErrorMsg from './InputErrorMsg';
import CrossedEyeIcon from '../icons/CrossedEyeIcon';
import EyeIcon from '../icons/EyeIcon';
import classes from '@/styles/components/inputs/textInput.module.scss';

interface Props {
  data: TextInputType;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onUnfocus: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear: (inputName: string) => void;
}

function TextInput({
  data: {
    attributes,
    label,
    focused,
    touched,
    valid,
    value,
    errorMsg
  },
  onFocus,
  onUnfocus,
  onChange,
  onClear
}: Props) {
  const setupInputClassname = useCallback((): string => {
    if (focused) {
      return classes.inputFocused;
    }

    if (!focused && touched && !valid) {
      return classes.inputInvalid;
    }

    if (!focused && valid) {
      return classes.inputValid;
    }

    return '';
  }, [focused, touched, valid]);

  return (
    <div className={classes.input}>
      <label className={`${classes.inputLabel} ${value.trim() && classes.inputLabelVisible}`} htmlFor={attributes.id}>
        {label}
      </label>
      <input
        className={setupInputClassname()}
        type={attributes.type}
        id={attributes.id}
        name={attributes.name}
        placeholder={attributes.placeholder}
        value={value}
        onFocus={onFocus}
        onBlur={onUnfocus}
        onChange={onChange}
      />
      <div className={classes.inputActions}>
        {attributes.name.toLowerCase().includes('password') && (
          <button type="button">
            {attributes.type === 'text' ? <CrossedEyeIcon /> : <EyeIcon />}
          </button>
        )}
        {value.trim() && (
          <XFatIcon className={classes.clearBtn} onClick={onClear.bind(null, attributes.name)} />
        )}
      </div>
      <InputErrorMsg visible={!focused && !valid} text={errorMsg} />
    </div>
  );
}

export default TextInput;