'use server';

import { cookies } from 'next/headers';
import type { BaseApiResponseType } from '@/types/serverActions/common';
import { emailPattern } from '@/utils/inputValidators';
import { SIGNUP_RULES } from '@/configs/forms/validations/signup';

const FIELD_ERRORS = {
  'en': 'Invalid fields',
  'sr-RS': 'Uneseni podaci su nevalidni'
};

const BASE_URL = `${process.env.API_BASE_URL}/auth`;

export const signup = async (
  _: BaseApiResponseType,
  formData: FormData,
): Promise<{
  success: boolean;
  message: string;
}> => {
  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();
  const passwordConfirm = formData.get('passwordConfirm')?.toString();

  const cookieStore = cookies();
  const locale = cookieStore.get('i18next')?.value || 'en';

  if (
    !email ||
    !emailPattern.test(email) ||
    !password ||
    password.length < SIGNUP_RULES.password.minLength ||
    password.length > SIGNUP_RULES.password.maxLength ||
    !passwordConfirm ||
    passwordConfirm !== password
  ) {
    return {
      success: false,
      message: FIELD_ERRORS[locale as keyof typeof FIELD_ERRORS]
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message
      }
    }

    cookieStore.set('signup_success', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 1000,
      path: `/${locale}/email-sent`
    });

    cookieStore.set('pending_email', email, {
      maxAge: 60 * 1000,
      path: `/${locale}/email-sent`,
    });

    return {
      success: true,
      message: data.message
    }
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error'
    };
  }
};

export const login = async (
  _: BaseApiResponseType,
  formData: FormData,
) => {
  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  const cookieStore = cookies();
  const locale = cookieStore.get('i18next')?.value || 'en';

  if (
    !email ||
    !emailPattern.test(email) ||
    !password
  ) {
    return {
      success: false,
      message: FIELD_ERRORS[locale as keyof typeof FIELD_ERRORS]
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log('res', response);
    console.log('data', data);
    if (!response.ok) {
      return {
        success: false,
        message: data.message
      }
    }

    if (!data.data?.accessToken) {
      return {
        success: false,
        message: 'Token not provided. Try again.'
      };
    }

    cookieStore.set({
      name: 'fleetscore_access_token',
      value: data.data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(data.data.expiresAt)
    });

    return {
      success: true,
      message: data.message
    }
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error'
    };
  }
};

export const resendVerification = async () => {
  const cookieStore = cookies();
  const email = cookieStore.get('pending_email')?.value;
  if (!email) {
    return {
      success: false,
      message: 'Email not provided'
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message
      }
    }

    return {
      success: true,
      message: data.message
    }
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error'
    };
  }
};