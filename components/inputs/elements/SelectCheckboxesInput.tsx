import { SelectCheckboxesInputType } from '@/types/inputs';
import {
  type FC,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type ChangeEvent,
  useCallback,
  useRef
} from 'react';
import InputLabel from '../accessories/InputLabel';
import InputElement from '../accessories/InputElement';
import XFatIcon from '@/components/icons/XFatIcon';
import SearchDropdownInput from '../accessories/SearchDropdownInput';
import classes from '@/styles/components/inputs/elements/selectCheckboxesInput.module.scss';

interface Props {
  data: SelectCheckboxesInputType;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onUnfocus: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear: (inputName: string) => void;
  onSearchDropdown: (event: ChangeEvent<HTMLInputElement>, inputName: string) => void;
  onClearSearchDropdown: (inputName: string) => void;
  onCheck: (event: ChangeEvent<HTMLInputElement>, inputName: string) => void;
}

const SelectCheckboxesInput: FC<Props> = ({
  data: {
    attributes,
    label,
    focused,
    touched,
    searchTerm,
    valid,
    searchedOptions,
    value
  },
  onFocus,
  onUnfocus,
  onClear,
  onSearchDropdown,
  onClearSearchDropdown,
  onCheck
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const droppdownRef = useRef<HTMLDivElement | null>(null);
  
  const onUnfocusCustom: FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    const relatedTarget = e.relatedTarget;
    if (droppdownRef.current && droppdownRef.current.contains(relatedTarget)) {
      console.log('contains', relatedTarget);
      return null;
    }

    onUnfocus(e);
  }, [onUnfocus]);

  const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClear(attributes.name);
    ref.current?.focus();
  };
  
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
        readOnly
        value={value}
        focused={focused}
        touched={touched}
        valid={valid}
        onFocus={onFocus}
        onUnfocus={onUnfocusCustom}
      />
      {value.trim() && (
        <XFatIcon className={classes.clearBtn} onClick={handleClear} />
      )}
      {focused && (
        <div className={classes.inputDropdown} ref={droppdownRef} tabIndex={0}>
          <SearchDropdownInput
            value={searchTerm}
            parentInputName={attributes.name}
            onChange={onSearchDropdown}
            onClear={onClearSearchDropdown}
          />
          <div className={classes.inputDropdownContent}>
            {searchedOptions.map((option) => (
              <div key={option.id} className={classes.inputDropdownItem}>
                <input
                  type="checkbox"
                  name={option.value}
                  id={option.id.toString()}
                  checked={option.checked}
                  onChange={(event) => onCheck(event, attributes.name)}
                />
                <label htmlFor={option.value}>
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectCheckboxesInput;