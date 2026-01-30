import { cookies } from 'next/headers';
import AuthApi from './authApi';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';

export const getProfile = async (locale: string, accessToken: string) => {
  const authApiProfile = new AuthApi({ locale });

  return await authApiProfile
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .getProfile();
};

export const verifyEmail = async (token: string) => {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/verify?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    return {
      success: false,
      message: 'failed'
    };
  }

  const data = await response.json();
  cookies().delete(COOKIE_NAMES.VERIFY_EMAIL_PENDING);

  return {
    success: true,
    messsage: data?.message || 'Success'
  };
};