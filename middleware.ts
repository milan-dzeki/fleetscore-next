import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
};

export function middleware(req: NextRequest) {
  let lng: string | null = null;

  const reqLngCookie = req.cookies.get(cookieName);
  if (reqLngCookie) {
    lng = reqLngCookie.value;
  }

  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  }

  if (!lng) {
    lng = fallbackLng;
  }

  const { pathname } = req.nextUrl;

  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !pathname.startsWith('/_next')
  ) {
    const redirectResponse = NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
    if (pathname.includes('/auth') || pathname.includes('/onboarding')) {
    redirectResponse.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
  }
    return redirectResponse;
  }

  const response = NextResponse.next();
  if (pathname.includes('/auth') || pathname.includes('/onboarding')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
  }

  const headerRef = req.headers.get('referer');

  if (headerRef) {
    const refererUrl = new URL(headerRef);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer)
    }
    
    return response;
  }

  return response;
}