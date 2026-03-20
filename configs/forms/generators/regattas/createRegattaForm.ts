import type { FormType } from '@/types/forms';
import { INPUT_TYPES } from '@/types/inputs';

export const generateCreateRegattaForm = (
  t: (key: string) => string
): FormType => {
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
      startDate: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'date',
          id: 'startDate',
          name: 'startDate',
          placeholder: t('startDatePlaceholder')
        },
        label: t('startDateLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('startDateErrorMsg')
      },
      endDate: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'date',
          id: 'endDate',
          name: 'endDate',
          placeholder: t('endDatePlaceholder')
        },
        label: t('endDateLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('endDateErrorMsg')
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
      venue: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'text',
          id: 'venue',
          name: 'venue',
          placeholder: t('venuePlaceholder')
        },
        label: t('venueLabel'),
        validation: {
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('venueErrorMsg')
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
      throwoutAfter: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'number',
          id: 'throwoutAfter',
          name: 'throwoutAfter',
          placeholder: t('throwoutAfterPlaceholder')
        },
        label: t('throwoutAfterLabel'),
        validation: {
          required: false
        },
        focused: false,
        touched: false,
        valid: true,
        value: '',
        errorMsg: t('throwoutAfterErrorMsg')
      },
      throwoutLimit: {
        inputType: INPUT_TYPES.TEXT,
        attributes: {
          type: 'number',
          id: 'throwoutLimit',
          name: 'throwoutLimit',
          placeholder: t('throwoutLimitPlaceholder')
        },
        label: t('throwoutLimitLabel'),
        validation: {
          required: false
        },
        focused: false,
        touched: false,
        valid: true,
        value: '',
        errorMsg: t('throwoutLimitErrorMsg')
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
        options: [],
        searchedOptions: [],
        errorMsg: t('organisationErrorMsg')
      },
      sailingClassIds: {
        inputType: INPUT_TYPES.SELECT_CHECKBOXES,
        attributes: {
          type: 'text',
          id: 'sailingClassIds',
          name: 'sailingClassIds',
          placeholder: t('sailingClassesPlaceholder')
        },
        validation: {
          required: true
        },
        label: t('sailingClassesLabel'),
        focused: false,
        touched: false,
        searchTerm: '',
        valid: false,
        value: '',
        options: [],
        searchedOptions: [],
        errorMsg: t('sailingClassesErrorMsg')
      }
    },
    isValid: false
  };
};