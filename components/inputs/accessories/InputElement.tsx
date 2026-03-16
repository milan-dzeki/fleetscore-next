import {
  type ChangeEventHandler,
  type FocusEventHandler,
  forwardRef,
  useCallback
} from 'react';
import type { InputAttributesType } from '@/types/inputs';
import classes from '@/styles/components/inputs/accessories/inputElement.module.scss';

interface Props {
  attributes: InputAttributesType;
  value: string;
  focused: boolean;
  touched: boolean;
  valid: boolean;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onUnfocus: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputElement = forwardRef<HTMLInputElement, Props>(({
  attributes,
  value,
  focused,
  touched,
  valid,
  onFocus,
  onUnfocus,
  onChange,
}, ref) => {
  const setClassname = useCallback((): string => {
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

  return (
    <input
      ref={ref}
      className={`${classes.inputElement} ${setClassname()}`}
      type={attributes.type}
      id={attributes.id}
      name={attributes.name}
      placeholder={attributes.placeholder}
      value={value}
      onFocus={onFocus}
      onBlur={onUnfocus}
      onChange={onChange}
    />
  );
});

InputElement.displayName = "InputElement";

export default InputElement;