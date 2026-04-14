import { NextRequest, NextResponse } from 'next/server';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import ClubsApi from '@/customApi/clubs/clubsApi';

export async function GET (req: NextRequest) {
  const clubsApi = new ClubsApi({});
  const searchParams = req.nextUrl.searchParams;
  const sailingNationId = searchParams.get('sailingNationId');

  const response = await clubsApi.get(sailingNationId || '');
  return NextResponse.json(response, { status: response.statusCode });
}

export async function POST (req: NextRequest) {
  const requestBody = await req.json();
  const locale = req.cookies.get('i18next')?.value || 'en';
  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const clubsApi = new ClubsApi({ requestBody });
  const response = await clubsApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .create(locale);

  return NextResponse.json(response, { status: response.statusCode });
}