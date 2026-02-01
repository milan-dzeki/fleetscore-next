import type { FormType } from '@/types/forms';
import { SIGNUP_RULES } from '@/configs/forms/validations/signup';

export const generateResetPasswordForm = (
  t: (key: string) => string
): FormType => {
  return {
    inputs: {
      password: {
        attributes: {
          type: 'password',
          id: 'password',
          name: 'password',
          placeholder: t('newPasswordPlaceholder')
        },
        label: t('newPasswordLabel'),
        validation: {
          required: true,
          minLength: SIGNUP_RULES.password.minLength,
          maxLength: SIGNUP_RULES.password.maxLength
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('newPasswordErrorMsg')
      },
      passwordConfirm: {
        attributes: {
          type: 'password',
          id: 'passwordConfirm',
          name: 'passwordConfirm',
          placeholder: t('newPasswordConfirmPlaceholder')
        },
        label: t('newPasswordConfirmLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('newPasswordConfirmErrorMsg')
      }
    },
    isValid: false
  };
};