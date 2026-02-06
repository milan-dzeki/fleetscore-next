import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import ROUTE_PATHS from '@/configs/routePaths';

interface Props {
  locale: string;
}

const AuthRedirectGuard = async ({ locale }: Props) => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const pendingEmailVerification =
    cookieStore.get(COOKIE_NAMES.VERIFY_EMAIL_PENDING)?.value;
  const createProfilePending =
    cookieStore.get(COOKIE_NAMES.CREATE_PROFILE_PENDING)?.value;

  if (pendingEmailVerification && !accessToken) {
    redirect(`/${locale}${ROUTE_PATHS.ONBOARDING.emailSent}`, RedirectType.replace);
  }

  if (createProfilePending) {
    redirect(`/${locale}${ROUTE_PATHS.ONBOARDING.createProfile}`, RedirectType.replace);
  }

  if (accessToken) {
    redirect(`/${locale}${ROUTE_PATHS.HOME.root}`, RedirectType.replace);
  }

  return null;
};

export default AuthRedirectGuard;
