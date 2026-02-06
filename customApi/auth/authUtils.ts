import { cookies } from 'next/headers';
import AuthApi from './authApi';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import { cache } from 'react';

export const getProfile = cache(async (accessToken?: string) => {
  const authApiProfile = new AuthApi({});

  const token = accessToken || cookies().get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  return await authApiProfile
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .getProfile();
});

export const verifyEmail = async (token: string) => {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/verify?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
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