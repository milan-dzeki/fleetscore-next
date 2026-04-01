import type { TranslationFunctionType } from '@/types/commons';
import type { FormType } from '@/types/forms';
import { INPUT_TYPES } from '@/types/inputs';

export const generateCreateClubForm = (t: TranslationFunctionType): FormType => {
  return {
    inputs: {
      name: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'name',
          name: 'name',
          placeholder: t('namePlaceholder')
        },
        label: t('nameLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('nameErrorMsg')
      },
      country: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'country',
          name: 'country',
          placeholder: t('countryPlaceholder')
        },
        label: t('countryLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('countryErrorMsg')
      },
      place: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'place',
          name: 'place',
          placeholder: t('placePlaceholder')
        },
        label: t('placeLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('placeErrorMsg')
      },
      postCode: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'postCode',
          name: 'postCode',
          placeholder: t('postCodePlaceholder')
        },
        label: t('postCodeLabel'),
        validation: {
          required: false
        },
        focused: false,
        touched: false,
        value: '',
        valid: true,
        errorMsg: ''
      },
      address: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'address',
          name: 'address',
          placeholder: t('addressPlaceholder')
        },
        label: t('addressLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('addressErrorMsg')
      },
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
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('emailErrorMsg')
      },
      phone: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'tel',
          id: 'phone',
          name: 'phone',
          placeholder: t('phonePlaceholder')
        },
        label: t('phoneLabel'),
        validation: {
          required: false
        },
        focused: false,
        touched: false,
        valid: true,
        value: '',
        errorMsg: t('phoneErrorMsg')
      },
      organisationId: {
        inputType: INPUT_TYPES.SELECT,
        attributes: {
          type: 'text',
          id: 'organisationId',
          name: 'organisationId',
          placeholder: t('organisationPlaceholder')
        },
        validation: {
          required: true
        },
        label: t('organisationLabel'),
        focused: false,
        touched: false,
        searchTerm: '',
        valid: false,
        value: '',
        dropdownOpen: false,
        options: [],
        searchedOptions: [],
        errorMsg: t('organisationErrorMsg')
      }
    },
    isValid: false
  };
};