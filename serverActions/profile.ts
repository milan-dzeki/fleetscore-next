'use server';

import { cookies } from 'next/headers';
import type { BaseApiResponseType } from '@/types/serverActions/common';
import { PROFILE_RULES } from '@/configs/forms/validations/profile';

const BASE_URL = `${process.env.API_BASE_URL}/profile`;

export const createProfile = async (
  _: BaseApiResponseType,
  formData: FormData,
) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('fleetscore_access_token')?.value;

  if (!accessToken) {
    return {
      success: false,
      message: 'You are no logged in'
    };
  }
  const firstName = formData.get('firstName')?.toString().trim();
  const lastName = formData.get('lastName')?.toString().trim();

  if (
    !firstName ||
    firstName.length < PROFILE_RULES.firstName.minLength ||
    !lastName ||
    lastName.length < PROFILE_RULES.lastName.minLength
  ) {
    return {
      success: false,
      message: 'Invalid paramatares'
    };
  }

  const response = await fetch(`${BASE_URL}/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ firstName, lastName })
  });

  const data = await response.json();

  return {
    success: true,
    message: 'true',
    data
  };
};