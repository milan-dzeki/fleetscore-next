export const INPUT_TYPES = {
  TEXT: 'TEXT',
  SELECT: 'SELECT',
  SELECT_CHECKBOXES: 'SELECT_CHECKBOXES'
} as const;

export interface InputAttributesType {
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'number';
  id: string;
  name: string;
  placeholder: string;
}

export interface InputValidationType {
  required: boolean;
  isEmail?: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface SelectInputOptionType {
  id: string | number;
  value: string;
}

export interface SelectInputCheckboxOptionType {
  id: string | number;
  value: string;
  checked: boolean;
}

export interface TextInputType {
  inputType: typeof INPUT_TYPES.TEXT;
  attributes: InputAttributesType;
  label: string;
  validation: InputValidationType;
  focused: boolean;
  touched: boolean;
  valid: boolean;
  value: string;
  errorMsg: string;
}

export interface SelectInputType {
  inputType: typeof INPUT_TYPES.SELECT;
  attributes: InputAttributesType;
  label: string;
  validation: InputValidationType;
  searchTerm: string;
  dropdownOpen: boolean;
  options: SelectInputOptionType[];
  searchedOptions: SelectInputOptionType[];
  focused: boolean;
  touched: boolean;
  valid: boolean;
  value: string;
  errorMsg: string;
}

export interface SelectCheckboxesInputType {
  inputType: typeof INPUT_TYPES.SELECT_CHECKBOXES;
  attributes: InputAttributesType;
  label: string;
  validation: InputValidationType;
  searchTerm: string;
  dropdownOpen: boolean;
  options: SelectInputCheckboxOptionType[];
  searchedOptions: SelectInputCheckboxOptionType[];
  focused: boolean;
  touched: boolean;
  valid: boolean;
  value: string;
  errorMsg: string;
}

export type InputType = TextInputType | SelectInputType | SelectCheckboxesInputType;