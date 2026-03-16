export const INPUT_TYPES = {
  TEXT: 'TEXT',
  SELECT: 'SELECT'
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

export interface SearchInputOptionType {
  id: string | number;
  value: string;
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
  options: SearchInputOptionType[];
  searchedOptions: SearchInputOptionType[];
  focused: boolean;
  touched: boolean;
  valid: boolean;
  value: string;
  errorMsg: string;
}

export type InputType = TextInputType | SelectInputType;