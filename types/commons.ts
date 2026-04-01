import SERVER_METHODS from '@/configs/server/methods';

export interface ObjectWithStringValuesType {
  [name: string]: string;
}

export interface ObjectWithBooleanValuesType {
  [name: string]: boolean;
}

export type TranslationFunctionType = (key: string) => string;

export interface FormApiConfigType {
  endpoint: string;
  method: typeof SERVER_METHODS[keyof typeof SERVER_METHODS];
  credentials?: RequestCredentials;
}