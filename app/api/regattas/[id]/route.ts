import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import RegattasApi from '@/customApi/regattas/regattasApi';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params }: { params: { id: string } }) {
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
    .update(locale, params.id);

  return NextResponse.json(response, { status: response.statusCode });
}

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  const locale = req.cookies.get('i18next')?.value || 'en';
  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const regattasApi = new RegattasApi({});
  const response = await regattasApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .delete(params.id, locale);

  return NextResponse.json(response, { status: response.statusCode });
}