export const ORGANISATION_RULES = {
  name: {
    minLength: 3,
    maxLength: 100
  },
  country: {
    minLength: 3,
    maxLength: 100
  },
  place: {
    minLength: 3,
    maxLength: 100
  },
  postCode: {
    minLength: 1,
    maxLength: 20
  },
  address: {
    minLength: 3,
    maxLength: 100
  },
  phone: {
    minLength: 3,
    maxLength: 50
  }
} as const;