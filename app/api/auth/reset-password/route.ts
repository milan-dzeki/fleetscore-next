import AuthApi from '@/customApi/auth/authApi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  const requestBody = await req.json();

  const authApi = new AuthApi({ requestBody });
  const response = await authApi
    .setHeaders({ useDefaultHeaders: true })
    .validateFields('resetPassword')
    .removeReqBodyFieldsAfterValidation(['passwordConfirm'])
    .resetPassword();

  return NextResponse.json(response, { status: response.statusCode })
}