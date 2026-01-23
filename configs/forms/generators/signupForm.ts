import type { FormType } from '@/types/forms';
import { SIGNUP_RULES } from '../validations/signup';

export const generateSignupForm = (
  t: (key: string) => string
): FormType => {
  return {
    inputs: {
      email: {
        attributes: {
          type: 'email',
          id: 'email',
          name: 'email',
          placeholder: t('emailPlaceholder')
        },
        label: t('emailLabel'),
        validation: {
          required: true,
          isEmail: true
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('emailErrorMsg')
      },
      password: {
        attributes: {
          type: 'password',
          id: 'password',
          name: 'password',
          placeholder: t('passwordPlaceholder')
        },
        label: t('passwordLabel'),
        validation: {
          required: true,
          minLength: SIGNUP_RULES.password.minLength,
          maxLength: SIGNUP_RULES.password.maxLength
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('passwordErrorMsg')
      },
      passwordConfirm: {
        attributes: {
          type: 'password',
          id: 'passwordConfirm',
          name: 'passwordConfirm',
          placeholder: t('passwordConfirmPlaceholder')
        },
        label: t('passwordConfirmLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('passwordConfirmErrorMsg')
      }
    },
    isValid: false
  };
};