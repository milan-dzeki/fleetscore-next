import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import ProfileApi from '@/customApi/profile/profileApi';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  const body = await req.json();
  const locale = req.cookies.get('i18next')?.value || 'en';
  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const profileApi = new ProfileApi({ locale, requestBody: body });
  const response = await profileApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .validateFields('create')
    .create();

  const successResponse = NextResponse.json(response);

  if (response.success) {
    successResponse.cookies.delete(COOKIE_NAMES.CREATE_PROFILE_PENDING);
  }

  return successResponse;
}