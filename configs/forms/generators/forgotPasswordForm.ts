import type { FormType } from '@/types/forms';

export const generateForgotPasswordForm = (
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
      }
    },
    isValid: false
  };
};