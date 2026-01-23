import type { TextInputType } from './inputs';

export interface FormType {
  inputs: {
    [name: string]: TextInputType;
  };
  isValid: boolean;
}