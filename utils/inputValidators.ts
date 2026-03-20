import type { InputValidationType, SelectInputCheckboxOptionType, SelectInputOptionType } from '@/types/inputs';

export const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const validateInput = (
  value: string,
  validation: InputValidationType,
  options?: SelectInputOptionType[] | SelectInputCheckboxOptionType[]
) => {
  let isValid = true;

  const hasValue = value && value.trim().length > 0;

  if (options) {
    isValid = isValid && options.map((opt) => opt.value).includes(value);
  }

  if (validation.required) {
    if (!hasValue) {
      return false;
    }

    if (validation.isEmail) {
      isValid = isValid && emailPattern.test(value.trim());
    }

    if (validation.minLength) {
      isValid = isValid && value.trim().length >= validation.minLength;
    }

    if (validation.maxLength) {
      isValid = isValid && value.trim().length < validation.maxLength;
    }
  } else {
    if (Object.keys(validation).length <= 1) {
      return true;
    }

    if (hasValue && validation.isEmail) {
      isValid = isValid && emailPattern.test(value.trim());
    }

    if (hasValue && validation.minLength) {
      isValid = isValid && value.trim().length >= validation.minLength;
    }

    if (hasValue && validation.maxLength) {
      isValid = isValid && value.trim().length < validation.maxLength;
    }
  }

  return isValid;
};