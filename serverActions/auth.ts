'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import AuthApi from '@/customApi/auth/authApi';

export const resendVerification = async () => {
  const cookieStore = cookies();
  const locale = cookieStore.get('i18next')?.value || 'en';
  const email = cookieStore.get(COOKIE_NAMES.VERIFY_EMAIL_PENDING)?.value;

  if (!email) {
    return {
      success: false,
      message: 'Email not provided'
    }
  }

  const authApi = new AuthApi({
    locale,
    requestBody: { email }
  });

  return await authApi
    .setHeaders({ useDefaultHeaders: true })
    .resendVerificationEmail();
};

export const removeVerificationEmailCookie = async (redirectLink: string) => {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAMES.VERIFY_EMAIL_PENDING);
  const locale = cookieStore.get('i18next')?.value || 'en';
  redirect(`/${locale}${redirectLink}`);
};