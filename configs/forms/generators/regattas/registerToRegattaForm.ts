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
      dateOfBirth: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'date',
          id: 'dateOfBirth',
          name: 'dateOfBirth',
          placeholder: t('dateOfBirthPlaceholder')
        },
        label: t('dateOfBirtheLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('dateOfBirthErrorMsg')
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
      sailingClubId: {
        inputType: INPUT_TYPES.SELECT,
        attributes: {
          type: 'text',
          id: 'sailingClubId',
          name: 'sailingClubId',
          placeholder: t('sailingClubNamePlaceholder')
        },
        label: t('sailingClubNameLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        options: [],
        searchedOptions: [],
        dropdownOpen: false,
        value: '',
        valueName: 'sailingClubName',
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
      },
      sailingNationId: {
        inputType: INPUT_TYPES.SELECT,
        attributes: {
          type: 'text',
          id: 'sailingNationId',
          name: 'sailingNationId',
          placeholder: t('countryPlaceholder')
        },
        label: t('countryLabel'),
        validation: {
          required: true
        },
        dropdownOpen: false,
        options: [],
        searchedOptions: [],
        searchTerm: '',
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('countryErrorMsg')
      },
      sailNumber: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'sailNumber',
          name: 'sailNumber',
          placeholder: t('sailNumberPlaceholder')
        },
        label: t('sailNumberLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('sailNumberErrorMsg')
      },
    },
    isValid: false
  };
};