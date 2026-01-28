import { cache } from 'react';
import AuthApi from './authApi';

export const getProfile = cache(async (locale: string, accessToken: string) => {
  const authApiProfile = new AuthApi({ locale });

  return await authApiProfile
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .getProfile({ defaultErrorMsg: 'error create profile' });
});