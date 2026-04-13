import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import ProfileApi from '@/customApi/profile/profileApi';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({
      message: 'User id not provided'
    }, { status: 400 });
  }

  const profileApi = new ProfileApi({});
  const response = await profileApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .getMySailors(userId);

  const successResponse = NextResponse.json(response);

  if (response.success) {
    successResponse.cookies.delete(COOKIE_NAMES.CREATE_PROFILE_PENDING);
  }

  return successResponse;
}