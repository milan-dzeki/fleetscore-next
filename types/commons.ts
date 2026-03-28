export interface ObjectWithStringValuesType {
  [name: string]: string;
}

export interface ObjectWithBooleanValuesType {
  [name: string]: boolean;
}

export type TranslationFunctionType = (key: string) => string;