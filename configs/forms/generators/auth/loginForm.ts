import type { FormType } from '@/types/forms';
import { INPUT_TYPES } from '@/types/inputs';

export const generateLoginForm = (
  t: (key: string) => string
): FormType => {
  return {
    inputs: {
      email: {
        inputType: INPUT_TYPES.TEXT,
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
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'password',
          id: 'password',
          name: 'password',
          placeholder: t('passwordPlaceholder')
        },
        label: t('passwordLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('passwordErrorMsg')
      }
    },
    isValid: false
  };
};