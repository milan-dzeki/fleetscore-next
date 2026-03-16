import type { FormType } from '@/types/forms';
import { INPUT_TYPES } from '@/types/inputs';

export const generateCreateProfileForm = (t: (key: string) => string): FormType => {
  return {
    inputs: {
      firstName: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'firstName',
          name: 'firstName',
          placeholder: t('firstNamePlaceholder')
        },
        label: t('firstNameLabel'),
        validation: {
          required: true,
          minLength: 2
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('firstNameErrorMsg')
      },
      lastName: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'lastName',
          name: 'lastName',
          placeholder: t('lastNamePlaceholder')
        },
        label: t('lastNameLabel'),
        validation: {
          required: true,
          minLength: 2
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('lastNameErrorMsg')
      }
    },
    isValid: false
  };
};