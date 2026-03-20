import { NextRequest, NextResponse } from 'next/server';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import RegattasApi from '@/customApi/regattas/regattasApi';

export async function POST (req: NextRequest) {
  const requestBody = await req.json();
  const locale = req.cookies.get('i18next')?.value || 'en';
  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const regattasApi = new RegattasApi({ requestBody });
  const response = await regattasApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .create(locale);

  return NextResponse.json(response, { status: response.statusCode });
}