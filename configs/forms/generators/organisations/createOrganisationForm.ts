import type { FormType } from '@/types/forms';

export const generateCreateOrganisationForm = (
  t: (key: string) => string
): FormType => {
  return {
    inputs: {
      name: {
        attributes: {
          type: 'text',
          id: 'name',
          name: 'name',
          placeholder: t('namePlaceholder')
        },
        label: t('nameLabel'),
        validation: {
          required: true,
          minLength: 3,
          maxLength: 50
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('nameErrorMsg')
      }
    },
    isValid: false
  };
};