import { NextRequest, NextResponse } from "next/server";
import AuthApi from "@/customApi/auth/authApi";
import COOKIE_NAMES from "@/configs/server/auth/cookieNames";
import { getProfile } from "@/customApi/auth/authUtils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const locale = req.cookies.get('i18next')?.value || 'en';

  const authApiLogin = new AuthApi({
    locale,
    returnRawHeaders: true,
    requestBody: body
  });

  const loginResponse = await authApiLogin
    .setHeaders({ useDefaultHeaders: true })
    .validateFields('login')
    .login();

  if (!loginResponse.success) {
    return NextResponse.json(loginResponse, { status: 401 });
  }

  let refreshToken: string | undefined = undefined;

  if (loginResponse.rawHeaders) {
    const RESTServerCookies = loginResponse.rawHeaders.getSetCookie();

    refreshToken = RESTServerCookies.find((cookie) => cookie.trim().startsWith(`${COOKIE_NAMES.REFRESH_TOKEN}=`));
  }

  if (!refreshToken) {
    return NextResponse.json({
      success: false,
      message: 'Network error. Try again'
    }, {
      status: 500
    });
  }

  const profileResponse = await getProfile(locale, loginResponse.data.accessToken);

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
    maxAge: 604800, // 7 days (matches your Java Max-Age)
  });

  if ('data' in profileResponse) {
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
  }
  return response;
}

// const refreshToken = req.cookies.get('refresh_token')?.value;

// const res = await fetch('java-api/refresh', {
//   method: 'POST',
//   headers: {
//     // You MUST manually pass the cookie to Java here
//     'Cookie': `refresh_token=${refreshToken}`
//   }
// });