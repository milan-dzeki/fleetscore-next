export interface TextInputType {
  attributes: {
    type: 'text' | 'email' | 'password' | 'tel';
    id: string;
    name: string;
    placeholder: string;
  };
  label: string;
  validation: {
    required: boolean;
    isEmail?: boolean;
    minLength?: number;
    maxLength?: number;
  };
  focused: boolean;
  touched: boolean;
  valid: boolean;
  value: string;
  errorMsg: string;
}