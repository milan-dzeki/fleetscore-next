export const UseFormActionTypes = {
  ON_INPUT_FOCUS: 'ON_INPUT_FOCUS',
  ON_INPUT_UNFOCUS: 'ON_INPUT_UNFOCUS',
  ON_INPUT_CHANGE: 'ON_INPUT_CHANGE',
  ON_CLEAR_INPUT: 'ON_CLEAR_INPUT',
  ON_PASSWORD_VISIBILITY_TOGGLE: 'ON_PASSWORD_VISIBILITY_TOGGLE',
  ON_CHECK_FORM_VALIDITY: 'ON_CHECK_FORM_VALIDITY'
} as const;

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

export type UserFormAction = (
  OnInputFocusAction |
  OnInputUnfocusAction |
  OnInputChangeAction |
  OnClearInputAction |
  OnPasswordVisibilityToggleAction |
  OnCheckFormValidityAction
);