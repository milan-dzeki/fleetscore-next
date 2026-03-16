import type { FormType } from '@/types/forms';
import { INPUT_TYPES } from '@/types/inputs';

export const generateForgotPasswordForm = (
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
      }
    },
    isValid: false
  };
};