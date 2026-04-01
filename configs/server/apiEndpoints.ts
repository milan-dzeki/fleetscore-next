export const API_ENDPOINTS = {
  AUTH: {
    signup: '/api/auth/signup',
    login: '/api/auth/login',
    refreshToken: '/api/auth/refresh-token',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password'
  },
  PROFILE: {
    create: '/api/profile/me'
  },
  ORGANISATIONS: {
    get: '/api/organisations',
    create: '/api/organisations/'
  },
  REGATTAS: {
    create: '/api/regattas',
    edit: '/api/regattas',
    delete: '/api/regattas'
  },
  SAILING_CLASSES: {
    get: '/api/sailing-classes/'
  }
};