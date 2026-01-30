import { NextRequest, NextResponse } from 'next/server';
import AuthApi from '@/customApi/auth/authApi';

export async function POST (req: NextRequest) {
  const locale = req.cookies.get('i18next')?.value || 'en';
  const requestBody = await req.json();

  const authApi = new AuthApi({ locale, requestBody });

  const response = await authApi
    .setHeaders({ useDefaultHeaders: true })
    .validateFields('forgotPassword')
    .forgotPassword();

  return NextResponse.json(response, { status: response.statusCode })
}