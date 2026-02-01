import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import COOKIE_NAMES from "@/configs/server/auth/cookieNames";
import ROUTE_PATHS from "@/configs/routePaths";

const AuthRedirectGuard = async () => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const pendingEmailVerification =
    cookieStore.get(COOKIE_NAMES.VERIFY_EMAIL_PENDING)?.value;
  const createProfilePending =
    cookieStore.get(COOKIE_NAMES.CREATE_PROFILE_PENDING)?.value;

  if (pendingEmailVerification && !accessToken) {
    redirect(ROUTE_PATHS.ONBOARDING.emailSent);
  }

  if (createProfilePending) {
    redirect(ROUTE_PATHS.ONBOARDING.createProfile);
  }

  if (accessToken) {
    redirect(ROUTE_PATHS.HOME.root);
  }

  return null;
};

export default AuthRedirectGuard;
