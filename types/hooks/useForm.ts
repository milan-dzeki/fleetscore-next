import { Dispatch } from 'react';
import type { FormType } from '../forms';
import { SelectInputOptionType, SelectInputType } from '../inputs';

export interface UseFormParamsType {
  providedForm: FormType;
  prepopulateForm?: () => Promise<FormType | { error: string; }> | FormType;
  customSelectHandlers?: {
    [inputName: string]: (params: {
      dispatch: Dispatch<UseFormAction>;
      input: SelectInputType;
      value: string;
    }) => Promise<void>
  } | null;
}

export interface FormStateType {
  form: FormType;
  prepopulateInfo: {
    loading: boolean;
    isPrepopulated: boolean;
    error: string | null;
  };
}

export const UseFormActionTypes = {
  ON_SET_FORM_START: 'ON_SET_FORM_START',
  ON_SET_FORM_FAILED: 'ON_SET_FORM_FAILED',
  ON_SET_FORM_SUCCESS: 'ON_SET_FORM_SUCCESS',
  ON_INPUT_FOCUS: 'ON_INPUT_FOCUS',
  ON_INPUT_UNFOCUS: 'ON_INPUT_UNFOCUS',
  ON_INPUT_CHANGE: 'ON_INPUT_CHANGE',
  ON_CLEAR_INPUT: 'ON_CLEAR_INPUT',
  ON_PASSWORD_VISIBILITY_TOGGLE: 'ON_PASSWORD_VISIBILITY_TOGGLE',
  ON_CHECK_FORM_VALIDITY: 'ON_CHECK_FORM_VALIDITY',
  ON_SELECT: 'ON_SELECT',
  ON_SELECT_DROPDOWN_CHECK: 'ON_SELECT_DROPDOWN_CHECK',
  ON_SEARCH_DROPDOWN: 'ON_SEARCH_DROPDOWN',
  ON_CLEAR_SEARCH_DROPDOWN: 'ON_CLEAR_SEARCH_DROPDOWN',
  ON_CLOSE_DROPDOWN: 'ON_CLOSE_DROPDOWN',
  ON_POPULATE_SELECT_DATA: 'ON_POPULATE_SELECT_DATA'
} as const;

interface OnSetFormStartAction {
  type: typeof UseFormActionTypes.ON_SET_FORM_START;
}

interface OnSetFormFailedAction {
  type: typeof UseFormActionTypes.ON_SET_FORM_FAILED;
  error: string;
}

interface OnSetFormSuccessAction {
  type: typeof UseFormActionTypes.ON_SET_FORM_SUCCESS;
  form: FormType;
}

interface OnInputFocusAction {
  type: typeof UseFormActionTypes.ON_INPUT_FOCUS;
  inputName: string;
}

interface OnInputUnfocusAction {
  type: typeof UseFormActionTypes.ON_INPUT_UNFOCUS;
  inputName: string;
}

interface OnInputChangeAction {
  type: typeof UseFormActionTypes.ON_INPUT_CHANGE;
  inputName: string;
  inputValue: string;
}

interface OnClearInputAction {
  type: typeof UseFormActionTypes.ON_CLEAR_INPUT;
  inputName: string;
}

interface OnPasswordVisibilityToggleAction {
  type: typeof UseFormActionTypes.ON_PASSWORD_VISIBILITY_TOGGLE;
  inputName: string;
}

interface OnCheckFormValidityAction {
  type: typeof UseFormActionTypes.ON_CHECK_FORM_VALIDITY;
  isValid: boolean;
}

interface OnSelectAction {
  type: typeof UseFormActionTypes.ON_SELECT;
  inputName: string;
  inputValue: string;
}

interface OnSelectDropdownCheckAction {
  type: typeof UseFormActionTypes.ON_SELECT_DROPDOWN_CHECK;
  inputName: string;
  checkedItemId: string | number;
}

interface OnSearchDropdownAction {
  type: typeof UseFormActionTypes.ON_SEARCH_DROPDOWN;
  inputName: string;
  searchTerm: string;
}

interface OnClearSearchDropdownAction {
  type: typeof UseFormActionTypes.ON_CLEAR_SEARCH_DROPDOWN;
  inputName: string;
}

interface OnCloseDropdownAction {
  type: typeof UseFormActionTypes.ON_CLOSE_DROPDOWN;
  inputName: string;
}

interface OnPopulateSelectDataAction {
  type: typeof UseFormActionTypes.ON_POPULATE_SELECT_DATA;
  inputName: string;
  selectOptions: SelectInputOptionType[];
}

export type UseFormAction = (
  OnSetFormStartAction |
  OnSetFormFailedAction |
  OnSetFormSuccessAction |
  OnInputFocusAction |
  OnInputUnfocusAction |
  OnInputChangeAction |
  OnClearInputAction |
  OnPasswordVisibilityToggleAction |
  OnCheckFormValidityAction |
  OnSelectAction |
  OnSelectDropdownCheckAction |
  OnSearchDropdownAction |
  OnClearSearchDropdownAction |
  OnCloseDropdownAction |
  OnPopulateSelectDataAction
);