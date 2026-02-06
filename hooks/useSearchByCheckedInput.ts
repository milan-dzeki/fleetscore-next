import {
  type ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import type {
  CheckboxParamsType,
  SearchByCheckedInputStateType
} from '@/types/hooks/useSearchByCheckedInput';
import { debounce } from '@/utils/debounce';

const setInitialState = (checkboxesData: CheckboxParamsType[]): SearchByCheckedInputStateType => {
  const checkboxesState: SearchByCheckedInputStateType['checkboxes'] = {};
  checkboxesData.forEach((box) => {
    checkboxesState[box.value] = {
      label: box.label,
      checked: false
    };
  });

  return {
    checkboxes: checkboxesState,
    textInputValue: ''
  };
};

export const useSearchByCheckedInput = (checkboxesData: CheckboxParamsType[]) => {
  const [inputState, setInputState] = useState<SearchByCheckedInputStateType>(setInitialState(checkboxesData));

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearchTerm(value), 300),
    []
  );

  useEffect(() => {
    debouncedSetSearch(inputState.textInputValue);
  }, [inputState.textInputValue, debouncedSetSearch]);

  const onChangeChecked: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const { name } = event.target;
    setInputState((prev) => {
      if (!(name in prev.checkboxes)) {
        return prev;
      }
      return {
        ...prev,
        checkboxes: {
          ...prev.checkboxes,
          [name]: {
            ...prev.checkboxes[name as keyof typeof prev.checkboxes],
            checked: !prev.checkboxes[name as keyof typeof prev.checkboxes].checked
          }
        }
      };
    });
  };

  const onSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputState((prev) => ({ ...prev, textInputValue: event.target.value }));
  };

  const onFilterBySearchParams = useCallback(<T extends object>(list: T[]): T[] => {
    if (!debouncedSearchTerm) {
      return list;
    }

    const textInputValueLowercase = debouncedSearchTerm.toLowerCase();
    const searchByValues = Object.keys(inputState.checkboxes)
      .filter((checkbox) => inputState.checkboxes[checkbox].checked);

    return list.filter((item) => {
      return searchByValues.some((key) => {
        const itemValue = item[key as keyof typeof item];
        if (!itemValue) return false;
        const stringValue = String(itemValue).toLowerCase();
        return stringValue.includes(textInputValueLowercase);
      });
    });
  }, [debouncedSearchTerm, inputState.checkboxes]);

  return {
    searchByInputState: inputState,
    onChangeChecked,
    onSearch,
    onFilterBySearchParams
  };
};