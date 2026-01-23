export interface TextInputType {
  attributes: {
    type: 'text' | 'email' | 'password';
    id: string;
    name: string;
    placeholder: string;
  };
  label: string;
  validation: {
    required: boolean;
    isEmail?: boolean;
  };
  focused: boolean;
  touched: boolean;
  valid: boolean;
  value: string;
  errorMsg: string;
}