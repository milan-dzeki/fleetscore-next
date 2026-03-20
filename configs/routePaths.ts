const ROUTE_PATHS = {
  HOME: {
    root: '/'
  },
  AUTH: {
    signup: '/auth/signup',
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password'
  },
  ONBOARDING: {
    emailSent: '/onboarding/email-sent',
    verifyEmail: '/onboarding/verify-email',
    createProfile: '/onboarding/create-profile'
  },
  ORGANISATIONS: {
    root: '/organisations',
    create: '/organisations/create'
  },
  REGATTAS: {
    root: '/regattas',
    create: '/regattas/create'
  }
};

export default ROUTE_PATHS;