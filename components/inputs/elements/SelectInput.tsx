import {
  type FC,
  type FocusEventHandler,
  type ChangeEventHandler,
  type MouseEventHandler,
  type ChangeEvent,
  useRef
} from 'react';
import type { SelectInputType } from '@/types/inputs';
import InputLabel from '../accessories/InputLabel';
import InputElement from '../accessories/InputElement';
import XFatIcon from '@/components/icons/XFatIcon';
import classes from '@/styles/components/inputs/elements/selectInput.module.scss';
import SearchDropdownInput from '../accessories/SearchDropdownInput';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface Props {
  data: SelectInputType;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onUnfocus: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSelect: (inputName: string, inputValue: string) => void;
  onClear: (inputName: string) => void;
  onSearchDropdown: (event: ChangeEvent<HTMLInputElement>, inputName: string) => void;
  onClearSearchDropdown: (inputName: string) => void;
  onCloseDropdown: (inputName: string) => void;
}

const SelectInput: FC<Props> = ({
  data: {
    attributes,
    label,
    focused,
    touched,
    valid,
    searchedOptions,
    searchTerm,
    value,
    dropdownOpen
  },
  onFocus,
  onUnfocus,
  onSelect,
  onClear,
  onSearchDropdown,
  onClearSearchDropdown,
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
          <div className={classes.inputDropdownContent}>
            <SearchDropdownInput
              value={searchTerm}
              parentInputName={attributes.name}
              onChange={onSearchDropdown}
              onClear={onClearSearchDropdown}
            />
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