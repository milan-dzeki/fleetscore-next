import {
  type FC,
  type FocusEventHandler,
  type ChangeEventHandler,
  useRef,
  useCallback
} from 'react';
import type { SelectInputType } from '@/types/inputs';
import InputLabel from '../accessories/InputLabel';
import InputElement from '../accessories/InputElement';
import classes from '@/styles/components/inputs/elements/selectInput.module.scss';

interface Props {
  data: SelectInputType;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onUnfocus: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSelect: (inputName: string, inputValue: string) => void;
}

const SelectInput: FC<Props> = ({
  data: {
    attributes,
    label,
    focused,
    touched,
    valid,
    searchedOptions,
    value
  },
  onFocus,
  onUnfocus,
  onChange,
  onSelect
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const droppdownRef = useRef<HTMLDivElement | null>(null);

  const onUnfocusCustom: FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    const relatedTarget = e.relatedTarget;
    if (droppdownRef.current && relatedTarget && droppdownRef.current.contains(relatedTarget)) {
      return null;
    }

    onUnfocus(e);
  }, [onUnfocus])

  return (
    <div className={classes.input}>
      <InputLabel
        visible={!!value.trim()}
        htmlFor={attributes.id}
        text={label}
      />
      <InputElement
        ref={ref}
        attributes={attributes}
        value={value}
        focused={focused}
        touched={touched}
        valid={valid}
        onFocus={onFocus}
        onUnfocus={onUnfocusCustom}
        onChange={onChange}
      />
      {focused && (
        <div className={classes.inputDropdown} ref={droppdownRef} tabIndex={0}>
          <div className={classes.inputDropdownContent}>
            {searchedOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={classes.inputDropdownItem}
                onClick={() => onSelect(attributes.name, option.value)}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectInput;