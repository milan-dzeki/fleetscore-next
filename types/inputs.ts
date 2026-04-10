export const INPUT_TYPES = {
  TEXT: 'TEXT',
  SELECT: 'SELECT',
  SELECT_CHECKBOXES: 'SELECT_CHECKBOXES',
  RADIO: 'RADIO'
} as const;

export interface InputAttributesType {
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'number' | 'radio';
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

interface InputBaseType {
  attributes: InputAttributesType;
  label: string;
  validation: InputValidationType;
  focused: boolean;
  touched: boolean;
  valid: boolean;
  value: string;
  errorMsg?: string;
}

export interface TextInputType extends InputBaseType {
  inputType: typeof INPUT_TYPES.TEXT;
}

export interface SelectInputType extends InputBaseType {
  inputType: typeof INPUT_TYPES.SELECT;
  searchTerm: string;
  dropdownOpen: boolean;
  options: SelectInputOptionType[];
  searchedOptions: SelectInputOptionType[];
}

export interface SelectCheckboxesInputType extends InputBaseType {
  inputType: typeof INPUT_TYPES.SELECT_CHECKBOXES;
  searchTerm: string;
  dropdownOpen: boolean;
  options: SelectInputCheckboxOptionType[];
  searchedOptions: SelectInputCheckboxOptionType[];
}

export interface RadioInputType extends InputBaseType {
  inputType: typeof INPUT_TYPES.RADIO;
  options: {
    id: string;
    value: string;
    checked: boolean;
  }[];
}

export type InputType = (
  TextInputType |
  SelectInputType |
  SelectCheckboxesInputType |
  RadioInputType
);