import { NextRequest, NextResponse } from 'next/server';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import AuthApi from '@/customApi/auth/authApi';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url); 
  const failRedirectUrl = searchParams.get('failRedirectUrl') || '/'; 

  const refreshTokenCookie = req.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (!refreshTokenCookie) {
    let response: NextResponse;

    if (failRedirectUrl) {
      response = NextResponse.redirect(new URL(failRedirectUrl, req.url));
    } else {
      response = NextResponse.json({
        success: false,
        message: 'Session expired. Login again.'
      }, {
        status: 400
      });
    }

    response.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
    response.cookies.delete(COOKIE_NAMES.CREATE_PROFILE_PENDING);
    return response;
  }
  
  const successRedirectUrl = searchParams.get('successRedirectUrl') || '/';

  const authApi = new AuthApi({ returnRawHeaders: true });

  const response = await authApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Cookie': `${COOKIE_NAMES.REFRESH_TOKEN}=${refreshTokenCookie}`
      }
    })
    .refreshToken();

  if (!response.success || !response.rawHeaders) {
    let unauthorizedResponse: NextResponse;

    if (failRedirectUrl) {
      unauthorizedResponse = NextResponse.redirect(new URL(failRedirectUrl, req.url));
    } else {
      unauthorizedResponse = NextResponse.json(response, { status: 401 });;
    }
    unauthorizedResponse.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
    unauthorizedResponse.cookies.delete(COOKIE_NAMES.CREATE_PROFILE_PENDING);
    return unauthorizedResponse;
  }
    
  let newRefreshToken: string | undefined = undefined;

  const RESTServerCookies = response.rawHeaders.getSetCookie();
  newRefreshToken = RESTServerCookies.find((cookie) => cookie.trim().startsWith(`${COOKIE_NAMES.REFRESH_TOKEN}=`));

  if (!newRefreshToken) {
    let expiredResponse: NextResponse;

    if (failRedirectUrl) {
      expiredResponse = NextResponse.redirect(new URL(failRedirectUrl, req.url));
    } else {
      expiredResponse = NextResponse.json({
        success: false,
        message: 'Session expired. Log in again'
      }, {
        status: 400
      });
    }

    expiredResponse.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
    expiredResponse.cookies.delete(COOKIE_NAMES.CREATE_PROFILE_PENDING);

    return expiredResponse;
  }

  let finalResponse: NextResponse;

  if (successRedirectUrl) {
    finalResponse = NextResponse.redirect(new URL(successRedirectUrl, req.url));
  } else {
    finalResponse = NextResponse.json({
      success: true,
      message: 'Session refreshed'
    }, {
      status: 200
    });
  }

  finalResponse.cookies.set({
    name: COOKIE_NAMES.ACCESS_TOKEN,
    value: response.data.accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(response.data.expiresAt)
  });

  const refreshTokenValue = newRefreshToken.split(';')[0].split('=')[1];
  finalResponse.cookies.set({
    name: COOKIE_NAMES.REFRESH_TOKEN,
    value: refreshTokenValue,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 604800, // 7 days (matches your Java Max-Age)
  });

  return finalResponse;
}