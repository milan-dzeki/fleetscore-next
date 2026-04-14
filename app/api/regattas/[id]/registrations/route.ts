import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import RegattasApi from '@/customApi/regattas/regattasApi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest, { params }: { params: { id: string } }) {
  const requestBody = await req.json();

  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const regattasApi = new RegattasApi({ requestBody });
  const response = await regattasApi
    .setHeaders({
      useDefaultHeaders: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .registerToRegatta(params.id);

  return NextResponse.json(response, { status: response.statusCode });
}