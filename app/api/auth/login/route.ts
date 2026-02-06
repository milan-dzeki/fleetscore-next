import { NextRequest, NextResponse } from 'next/server';
import AuthApi from '@/customApi/auth/authApi';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import { getProfile } from '@/customApi/auth/authUtils';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const authApiLogin = new AuthApi({
    returnRawHeaders: true,
    requestBody: body
  });

  const loginResponse = await authApiLogin
    .setHeaders({ useDefaultHeaders: true })
    .validateFields('login')
    .login();

  if (
    !loginResponse.success || !loginResponse.rawHeaders) {
    return NextResponse.json(loginResponse, { status: loginResponse.statusCode });
  }

  const RESTServerCookies = loginResponse.rawHeaders.getSetCookie();

  const refreshToken = RESTServerCookies.find((cookie) => cookie.trim().startsWith(`${COOKIE_NAMES.REFRESH_TOKEN}=`));

  if (!refreshToken) {
    return NextResponse.json({
      success: false,
      message: 'Network error. Try again'
    }, {
      status: 500
    });
  }

  const profileResponse = await getProfile(loginResponse.data.accessToken);
  if (!profileResponse.success) {
    return NextResponse.json(profileResponse, { status: profileResponse.statusCode })
  }

  const response = NextResponse.json(profileResponse);
  
  response.cookies.set({
    name: COOKIE_NAMES.ACCESS_TOKEN,
    value: loginResponse.data.accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(loginResponse.data.expiresAt)
  });

  const refreshTokenValue = refreshToken.split(';')[0].split('=')[1];
  response.cookies.set({
    name: COOKIE_NAMES.REFRESH_TOKEN,
    value: refreshTokenValue,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 604800, // 7 days (matches Java Max-Age)
  });


  if (!profileResponse.data.profileCreated) {
    response.cookies.set({
      name: COOKIE_NAMES.CREATE_PROFILE_PENDING,
      value: profileResponse.data.email,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }

  return response;
}