import { NextRequest, NextResponse } from 'next/server';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import OrganisationsApi from '@/customApi/organisations/organisationsApi';

export async function POST (req: NextRequest) {
  const requestBody = await req.json();
  const locale = req.cookies.get('i18next')?.value || 'en';
  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const organisationsApi = new OrganisationsApi({
    locale,
    requestBody
  });

  const response = await organisationsApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .validateFields('create')
    .create(locale);

  return NextResponse.json(response, { status: response.statusCode });
}