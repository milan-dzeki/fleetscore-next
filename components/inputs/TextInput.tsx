'use client';

import {
  type FocusEventHandler,
  type ChangeEventHandler,
  type MouseEventHandler,
  useCallback,
  memo,
  useRef
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
  onPasswordVisibilityToggle?: (inputName: string) => void;
}

const TextInput = ({
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
  onClear,
  onPasswordVisibilityToggle
}: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const setupInputClassname = useCallback((): string => {
    if (focused) {
      return classes.inputFocused;
    }

    if (!focused && touched && !valid) {
      return classes.inputInvalid;
    }

    if (!focused && touched && value && valid) {
      return classes.inputValid;
    }

    return '';
  }, [focused, touched, valid, value]);

  const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClear(attributes.name);
    ref.current?.focus();
  };

  return (
    <div className={classes.input}>
      <label className={`${classes.inputLabel} ${value.trim() && classes.inputLabelVisible}`} htmlFor={attributes.id}>
        {label}
      </label>
      <input
        ref={ref}
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
        {attributes.name.toLowerCase().includes('password') && onPasswordVisibilityToggle && (
          <button
            type="button"
            className={classes.inputPasswordToggler}
            onClick={() => onPasswordVisibilityToggle(attributes.name)}
          >
            {attributes.type === 'text' ? <CrossedEyeIcon /> : <EyeIcon />}
          </button>
        )}
        {value.trim() && (
          <XFatIcon className={classes.clearBtn} onClick={handleClear} />
        )}
      </div>
      <InputErrorMsg
        visible={!focused && touched && !valid}
        text={errorMsg}
      />
    </div>
  );
}

export default memo(TextInput);