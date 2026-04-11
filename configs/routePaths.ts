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
  },
  CLUBS: {
    root: '/clubs',
    create: '/clubs/create'
  },
  SAILING_CLASSES: {
    root: '/sailing-classes'
  }
};

export default ROUTE_PATHS;