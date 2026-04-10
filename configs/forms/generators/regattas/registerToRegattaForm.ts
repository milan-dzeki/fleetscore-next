import type { TranslationFunctionType } from '@/types/commons';
import type { FormType } from '@/types/forms';
import { INPUT_TYPES } from '@/types/inputs';

export const generateRegisterToRegattaForm = (t: TranslationFunctionType): FormType => {
  return {
    inputs: {
      sailorName: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'sailorName',
          name: 'sailorName',
          placeholder: t('sailorNamePlaceholder')
        },
        label: t('sailorNameLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('sailorNameErrorMsg')
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
      gender: {
        inputType: INPUT_TYPES.RADIO,
        attributes: {
          type: 'radio',
          id: 'gender',
          name: 'gender',
          placeholder: ''
        },
        label: t('genderLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: 'M',
        valid: true,
        options: [
          { id: 'M', value: 'M', checked: true },
          { id: 'F', value: 'F', checked: true }
        ]
      },
      sailingClubName: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'sailingClubName',
          name: 'sailingClubName',
          placeholder: t('sailingClubNamePlaceholder')
        },
        label: t('sailingClubNameLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('sailingClubNameErrorMsg')
      },
      sailingClassId: {
        inputType: INPUT_TYPES.SELECT,
        attributes: {
          type: 'text',
          id: 'sailingClassId',
          name: 'sailingClassId',
          placeholder: t('sailingClassIdPlaceholder')
        },
        validation: {
          required: true
        },
        label: t('sailingClassIdLabel'),
        focused: false,
        touched: false,
        value: '',
        valid: false,
        dropdownOpen: false,
        options: [],
        searchedOptions: [],
        searchTerm: '',
        errorMsg: t(`sailingClassIdErrorMsg`)
      }
    },
    isValid: false
  };
};