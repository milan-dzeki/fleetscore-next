import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './i18n/settings';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import AuthApi from '@/customApi/auth/authApi';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let lng: string | null = null;
  const reqLngCookie = req.cookies.get(cookieName);
  if (reqLngCookie) lng = reqLngCookie.value;
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  if (
    !languages.some((loc) => pathname.startsWith(`/${loc}`)) &&
    !pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
  }

  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = req.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  let response = NextResponse.next();

  if (!accessToken && refreshToken) {
    const authApi = new AuthApi({ 
      locale: lng, 
      returnRawHeaders: true 
    });

    const refreshResponse = await authApi
      .setHeaders({
        useDefaultHeaders: true,
        headers: {
          'Cookie': `${COOKIE_NAMES.REFRESH_TOKEN}=${refreshToken}`
        }
      })
      .refreshToken();

    if (refreshResponse.success && refreshResponse.rawHeaders) {
      const newAccessToken = refreshResponse.data.accessToken;
      const newExpiresAt = refreshResponse.data.expiresAt;

      const serverCookies = refreshResponse.rawHeaders.getSetCookie();
      const newRefreshTokenStr = serverCookies.find((c) => c.trim().startsWith(`${COOKIE_NAMES.REFRESH_TOKEN}=`));
      
      response.cookies.set({
        name: COOKIE_NAMES.ACCESS_TOKEN,
        value: newAccessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: new Date(newExpiresAt)
      });

      if (newRefreshTokenStr) {
        const refreshTokenValue = newRefreshTokenStr.split(';')[0].split('=')[1];
        response.cookies.set({
          name: COOKIE_NAMES.REFRESH_TOKEN,
          value: refreshTokenValue,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 604800, // 7 days (matches your Java Max-Age)
        });
      }

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('cookie', response.cookies.toString());

      const finalResponse = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      response.cookies.getAll().forEach((cookie) => {
        finalResponse.cookies.set(cookie);
      });

      response = finalResponse;
    } else if (refreshResponse.statusCode === 401 || refreshResponse.statusCode === 400) {
      response.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
      response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);
    }
  }

  const headerRef = req.headers.get('referer');
  if (headerRef) {
    const refererUrl = new URL(headerRef);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    }
  }

  return response;
}