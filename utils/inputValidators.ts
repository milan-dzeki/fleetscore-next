import type { TextInputType } from '@/types/inputs';

export const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const validateInput = (
  value: string,
  validation: TextInputType['validation']
) => {
  let isValid = true;

  if (!validation.required) {
    return true;
  }

  if (!value.trim()) {
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

  return isValid;
};