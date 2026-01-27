'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { BaseApiRawResponseType, BaseApiResponseType } from '@/types/customApi/baseApi';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import AuthApi from '@/customApi/auth/authApi';
import { ProfileApiResponseType } from '@/types/customApi/profileApi';
import { getProfile } from '@/customApi/auth/authUtils';

// const FIELD_ERRORS = {
//   'en': 'Invalid fields',
//   'sr-RS': 'Uneseni podaci su nevalidni'
// };

export const signup = async (
  _: BaseApiRawResponseType,
  formData: FormData,
): Promise<BaseApiRawResponseType> => {
  const cookieStore = cookies();
  const locale = cookieStore.get('i18next')?.value || 'en';

  const authApi = new AuthApi({
    locale,
    cookieStore,
    formData
  });

  return await authApi
    .setHeaders({ useDefaultHeaders: true })
    .validateFields('signup')
    .setBody()
    .signup({ defaultErrorMsg: 'error' });
};

export const login = async (
  _: BaseApiResponseType<ProfileApiResponseType>,
  formData: FormData
): Promise<BaseApiResponseType<ProfileApiResponseType>> => {
  const cookieStore = cookies();
  const locale = cookieStore.get('i18next')?.value || 'en';

  const authApiLogin = new AuthApi({
    locale,
    cookieStore,
    formData
  });

  const loginResponse = await authApiLogin
    .setHeaders({ useDefaultHeaders: true })
    .validateFields('login')
    .setBody()
    .login({ defaultErrorMsg: 'error login' });

  if (!loginResponse.success) {
    return loginResponse;
  }

  return await getProfile(locale, loginResponse.data.accessToken);
};

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
    cookieStore,
    customBody: { email }
  });

  return await authApi
    .setHeaders({ useDefaultHeaders: true })
    .setBody()
    .resendVerificationEmail({ defaultErrorMsg: 'error email' });
};

export const removeVerificationEmailCookie = async (redirectLink: string) => {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAMES.VERIFY_EMAIL_PENDING);
  const locale = cookieStore.get('i18next')?.value || 'en';
  redirect(`/${locale}${redirectLink}`);
};

export const removeVerificationEmailCookieNoredirect = async () => {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAMES.VERIFY_EMAIL_PENDING);
};