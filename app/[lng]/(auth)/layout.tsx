import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import ROUTE_PATHS from '@/configs/routePaths';
import { getProfile } from '@/customApi/auth/authUtils';

interface Props {
  children: ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  const cookieStore = cookies();
  const locale = cookieStore.get('i18next')?.value || 'en';
  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (accessToken) {
    const response = await getProfile(locale, accessToken);

    if (!response.success) {
      return children;
    }

    const emailVerifyCookie = cookieStore.get(COOKIE_NAMES.VERIFY_EMAIL_PENDING);

    if (!response.data?.emailVerified && emailVerifyCookie) {
      redirect(ROUTE_PATHS.ONBOARDING.emailSent);
    }

    if (!response.data?.profileCreated) {
      redirect(ROUTE_PATHS.ONBOARDING.createProfile);
    }

    redirect(ROUTE_PATHS.HOME.root);
  }

  return children;
};

export default AuthLayout;