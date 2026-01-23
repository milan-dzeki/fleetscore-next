export const UseFormActionTypes = {
  ON_INPUT_FOCUS: 'ON_INPUT_FOCUS',
  ON_INPUT_UNFOCUS: 'ON_INPUT_UNFOCUS',
  ON_INPUT_CHANGE: 'ON_INPUT_CHANGE'
} as const;

interface OnInputFocusAction {
  type: typeof UseFormActionTypes.ON_INPUT_FOCUS;
  inputName: string;
}

interface OnInputUnfocusAction {
  type: typeof UseFormActionTypes.ON_INPUT_UNFOCUS;
  inputName: string;
}

interface OnInputChange {
  type: typeof UseFormActionTypes.ON_INPUT_CHANGE;
  inputName: string;
  inputValue: string;
}

export type UserFormAction = (
  OnInputFocusAction |
  OnInputUnfocusAction |
  OnInputChange
);