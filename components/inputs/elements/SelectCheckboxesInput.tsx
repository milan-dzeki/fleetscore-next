import { SelectCheckboxesInputType } from '@/types/inputs';
import {
  type FC,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type ChangeEvent,
  useRef
} from 'react';
import InputLabel from '../accessories/InputLabel';
import InputElement from '../accessories/InputElement';
import XFatIcon from '@/components/icons/XFatIcon';
import SearchDropdownInput from '../accessories/SearchDropdownInput';
import classes from '@/styles/components/inputs/elements/selectCheckboxesInput.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface Props {
  data: SelectCheckboxesInputType;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onUnfocus: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear: (inputName: string) => void;
  onSearchDropdown: (event: ChangeEvent<HTMLInputElement>, inputName: string) => void;
  onClearSearchDropdown: (inputName: string) => void;
  onCheck: (event: ChangeEvent<HTMLInputElement>, inputName: string) => void;
  onCloseDropdown: (inputName: string) => void;
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
    value,
    dropdownOpen
  },
  onFocus,
  onUnfocus,
  onClear,
  onSearchDropdown,
  onClearSearchDropdown,
  onCheck,
  onCloseDropdown
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClear(attributes.name);
    ref.current?.focus();
  };

  const closeDropdown = () => {
    onCloseDropdown(attributes.name);
  };
  
  useOutsideClick(containerRef, closeDropdown, dropdownOpen);
  
  return (
    <div className={classes.input} ref={containerRef}>
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
        focused={focused || dropdownOpen}
        touched={touched}
        valid={valid}
        onFocus={onFocus}
        onUnfocus={onUnfocus}
      />
      {value.trim() && (
        <XFatIcon className={classes.clearBtn} onClick={handleClear} />
      )}
      {dropdownOpen && (
        <div className={classes.inputDropdown}>
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
                <label htmlFor={option.id.toString()}>
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