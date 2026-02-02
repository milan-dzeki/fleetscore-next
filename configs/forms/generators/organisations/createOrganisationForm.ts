import type { FormType } from '@/types/forms';
import { ORGANISATION_RULES } from '@/configs/forms/validations/organisations';

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
          minLength: ORGANISATION_RULES.name.minLength,
          maxLength: ORGANISATION_RULES.name.maxLength
        },
        focused: false,
        touched: false,
        valid: false,
        value: '',
        errorMsg: t('nameErrorMsg')
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
          required: false,
          minLength: ORGANISATION_RULES.country.minLength,
          maxLength: ORGANISATION_RULES.country.maxLength
        },
        focused: false,
        touched: false,
        valid: true,
        value: '',
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
          required: false,
          minLength: ORGANISATION_RULES.place.minLength,
          maxLength: ORGANISATION_RULES.place.maxLength
        },
        focused: false,
        touched: false,
        valid: true,
        value: '',
        errorMsg: t('placeErrorMsg')
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
          required: false,
          minLength: ORGANISATION_RULES.postCode.minLength,
          maxLength: ORGANISATION_RULES.postCode.maxLength
        },
        focused: false,
        touched: false,
        valid: true,
        value: '',
        errorMsg: t('postCodeErrorMsg')
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
          required: false,
          minLength: ORGANISATION_RULES.address.minLength,
          maxLength: ORGANISATION_RULES.address.maxLength
        },
        focused: false,
        touched: false,
        valid: true,
        value: '',
        errorMsg: t('addressErrorMsg')
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
          required: false,
          isEmail: true
        },
        focused: false,
        touched: false,
        valid: true,
        value: '',
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
          required: false,
          minLength: ORGANISATION_RULES.phone.minLength,
          maxLength: ORGANISATION_RULES.phone.maxLength
        },
        focused: false,
        touched: false,
        valid: true,
        value: '',
        errorMsg: t('phoneErrorMsg')
      }
    },
    isValid: false
  };
};