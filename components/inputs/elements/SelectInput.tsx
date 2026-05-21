import {
  type FC,
  type FocusEventHandler,
  type ChangeEventHandler,
  type MouseEventHandler,
  type ChangeEvent,
  useRef,
  useState,
  useEffect
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
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSelect: (inputName: string, inputValue: string) => void;
  onClear: (inputName: string) => void;
  onCloseDropdown: (inputName: string) => void;
  onSearchDropdown?: (event: ChangeEvent<HTMLInputElement>, inputName: string) => void;
  onClearSearchDropdown?: (inputName: string) => void;
  noMargins?: boolean;
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
  onChange,
  onSelect,
  onClear,
  onSearchDropdown,
  onClearSearchDropdown,
  onCloseDropdown,
  noMargins
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownContentRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);
  const [isDropdownTop, setIsDropdownTop] = useState(false);

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

  useEffect(() => {
    if (dropdownOpen && containerRef.current) {
      const { bottom } = containerRef.current.getBoundingClientRect();
      setIsDropdownTop(window.innerHeight - bottom < 100);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    if (dropdownOpen && isDropdownTop && dropdownContentRef.current) {
      const el = dropdownContentRef.current!;
      el.scrollTop = el.scrollHeight;
    }
  }, [dropdownOpen, isDropdownTop]);

  return (
    <div
      className={`
        ${classes.input}
        ${noMargins ? classes.inputNoMargins : ''}
      `} 
      ref={containerRef}>
      <InputLabel
        visible={!!value.trim()}
        htmlFor={attributes.id}
        text={label}
      />
      <InputElement
        ref={ref}
        attributes={attributes}
        readOnly={!!searchTerm}
        value={value}
        focused={focused || dropdownOpen}
        touched={touched}
        valid={valid}
        onChange={searchTerm === undefined && onChange ? onChange : () => {}}
        onFocus={onFocus}
        onUnfocus={onUnfocus}
      />
      {value.trim() && (
        <XFatIcon className={classes.clearBtn} onClick={handleClear} />
      )}
      {dropdownOpen && (
        <div className={`${classes.inputDropdown} ${isDropdownTop ? classes.inputDropdownTop : ''}`} ref={dropdownContentRef}>
          <div className={classes.inputDropdownContent}>
            {searchTerm !== undefined && onSearchDropdown && onClearSearchDropdown && (
              <SearchDropdownInput
                value={searchTerm}
                parentInputName={attributes.name}
                onChange={onSearchDropdown}
                onClear={onClearSearchDropdown}
              />
            )}
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