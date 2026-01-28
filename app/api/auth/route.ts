import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getProfile } from '@/customApi/auth/authUtils';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    const locale = request.nextUrl.searchParams.get('i18next') || 'en';

    if (!accessToken) {
      return NextResponse.json({
        message: 'No User'
      });
    }

    const response = await getProfile(locale, accessToken);
    
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ message: 'No user' });
  }
}