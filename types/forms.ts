import type { InputType } from './inputs';

export interface FormType {
  inputs: {
    [name: string]: InputType;
  };
  isValid: boolean;
}