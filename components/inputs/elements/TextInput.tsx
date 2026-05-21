'use client';

import {
  type FocusEventHandler,
  type ChangeEventHandler,
  type MouseEventHandler,
  memo,
  useRef
} from 'react';
import type { TextInputType } from '@/types/inputs';
import XFatIcon from '../../icons/XFatIcon';
import InputErrorMsg from '../InputErrorMsg';
import CrossedEyeIcon from '../../icons/CrossedEyeIcon';
import EyeIcon from '../../icons/EyeIcon';
import InputLabel from '../accessories/InputLabel';
import InputElement from '../accessories/InputElement';
import classes from '@/styles/components/inputs/elements/textInput.module.scss';

interface Props {
  data: TextInputType;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onUnfocus: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear?: (inputName: string) => void;
  onPasswordVisibilityToggle?: (inputName: string) => void;
  noMargins?: boolean;
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
  onPasswordVisibilityToggle,
  noMargins = false
}: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!onClear) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    onClear(attributes.name);
    ref.current?.focus();
  };

  return (
    <div className={`
      ${classes.input}
      ${noMargins ? classes.inputNoMargins : ''}
    `}>
      <InputLabel
        visible={!!value.trim() || attributes.type === 'date'}
        htmlFor={attributes.id}
        text={label}
      />
      <InputElement
        ref={ref}
        attributes={attributes}
        value={value}
        noClear={!onClear}
        focused={focused}
        touched={touched}
        valid={valid}
        onFocus={onFocus}
        onUnfocus={onUnfocus}
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
        {value.trim() && onClear && (
          <XFatIcon className={classes.clearBtn} onClick={handleClear} />
        )}
      </div>
      {errorMsg && (
        <InputErrorMsg
          visible={!focused && touched && !valid}
          text={errorMsg}
        />
      )}
    </div>
  );
}

export default memo(TextInput);