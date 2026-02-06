export interface CheckboxParamsType {
  value: string;
  label: string;
}

export interface SearchByCheckedInputStateType {
  checkboxes: {
    [name: string]: {
      label: string;
      checked: boolean;
    }
  };
  textInputValue: string;
}