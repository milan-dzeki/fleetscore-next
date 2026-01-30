export const PROFILE_RULES = {
  firstName: {
    minLength: 2,
    maxLength: 30
  },
  lastName: {
    minLength: 2,
    maxLength: 30
  }
} as const;