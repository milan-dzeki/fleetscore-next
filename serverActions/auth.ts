'use server';

import { cookies } from 'next/headers';
import type { BaseApiResponseType } from '@/types/serverActions/common';
import { emailPattern } from '@/utils/inputValidators';
import { SIGNUP_RULES } from '@/configs/forms/validations/signup';

const FIELD_ERRORS = {
  'en': 'Invalid fields',
  'sr-RS': 'Uneseni podaci su nevalidni'
};

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
    const response = await fetch('http://localhost:8080/api/auth/register', {
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
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log('DATA', data);
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