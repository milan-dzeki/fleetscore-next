export const API_ENDPOINTS = {
  AUTH: {
    signup: '/api/auth/signup',
    login: '/api/auth/login',
    refreshToken: '/api/auth/refresh-token',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password'
  },
  PROFILE: {
    create: '/api/profile/me',
    mySaliors: {
      get: '/api/profile/me/sailors'
    }
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
  },
  CLUBS: {
    get: '/api/clubs',
    create: '/api/clubs',
    delete: '/api/clubs',
    edit: '/api/clubs'
  },
  SAILING_NATIONS: {
    get: '/api/sailing-nations'
  }
};