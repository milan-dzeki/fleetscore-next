import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import ClubsApi from '@/customApi/clubs/clubsApi';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params }: { params: { id: string } }) {
  const requestBody = await req.json();
  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const clubsApi = new ClubsApi({ requestBody });
  const response = await clubsApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .update(params.id);

  return NextResponse.json(response, { status: response.statusCode });
}

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  const locale = req.cookies.get('i18next')?.value || 'en';
  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const clubsApi = new ClubsApi({});
  const response = await clubsApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .delete(params.id, locale);

  return NextResponse.json(response, { status: response.statusCode });
}