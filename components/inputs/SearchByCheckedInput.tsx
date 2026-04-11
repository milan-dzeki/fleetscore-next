'use client';

import {
  type ChangeEventHandler,
  useState,
  useRef
} from 'react';
import { SEARCH_BY_CHECKED_INPUT_NS } from '@/i18n/namespaces/components';
import { useTranslation } from '@/i18n/client';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import ArrowDownMinimalIcon from '../icons/ArrowDownMinimalIcon';
import classes from '@/styles/components/inputs/searchByCheckedInput.module.scss';

interface Props {
  locale: string;
  inputsState: {
    checkboxes: {
      [name: string]: {
        label: string;
        checked: boolean;
      }
    };
    textInputValue: string;
  };
  onChangeChecked: ChangeEventHandler<HTMLInputElement>;
  onSearch: ChangeEventHandler<HTMLInputElement>;
}

const SearchByCheckedInput = ({
  locale,
  inputsState,
  onChangeChecked,
  onSearch
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useTranslation(locale, SEARCH_BY_CHECKED_INPUT_NS);

  const onCloseDropdown = (): void => {
    setDropdownOpen(false);
  };

  useOutsideClick(dropdownRef, onCloseDropdown, dropdownOpen);

  const searchInputDisabled = Object.keys(inputsState.checkboxes)
    .every((checkbox) => !inputsState.checkboxes[checkbox].checked);

  return (
    <div className={classes.input}>
      <div className={classes.inputCheck} ref={dropdownRef}>
        <button
          type="button"
          className={classes.inputCheckSearchBy}
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <span className={classes.inputCheckSearchByLabel}>
            {t('searchBy')}
          </span>
          <ArrowDownMinimalIcon />
        </button>
        {
          dropdownOpen && (
            <ul className={classes.inputDropdown}>
              {Object.keys(inputsState.checkboxes).map((search) => (
                <li key={search} className={classes.inputDropdownItem}>
                  <input
                    type="checkbox"
                    id={search}
                    name={search}
                    checked={inputsState.checkboxes[search].checked}
                    onChange={onChangeChecked}
                  />
                  <label htmlFor={search}>{inputsState.checkboxes[search].label}</label>
                </li>
              ))}
            </ul>
          )
        }
      </div>
      <input
        type="text"
        className={classes.inputEl}
        placeholder={searchInputDisabled ? t('disabledText') : ''}
        disabled={searchInputDisabled}
        value={inputsState.textInputValue}
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchByCheckedInput;