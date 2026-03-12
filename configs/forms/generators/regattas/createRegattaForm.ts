import type { FormType } from '@/types/forms';

export const generateCreateRegattaForm = (
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
          required: true
        },
        focused: false,
        touched: false,
        value: '',
        valid: false,
        errorMsg: t('nameErrorMsg')
      },
      startDate: {
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
      }
    },
    isValid: false
  };
};