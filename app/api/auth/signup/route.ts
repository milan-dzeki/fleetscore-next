import { NextRequest, NextResponse } from "next/server";
import AuthApi from "@/customApi/auth/authApi";
import COOKIE_NAMES from "@/configs/server/auth/cookieNames";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const locale = req.cookies.get('i18next')?.value || 'en';

  const authApiSignup = new AuthApi({
    locale,
    requestBody: body
  });

  const signupResponse = await authApiSignup
    .setHeaders({ useDefaultHeaders: true })
    .validateFields('signup')
    .signup();

  if (!signupResponse.success) {
    return NextResponse.json(signupResponse, { status: 401 });
  }

  const response = NextResponse.json(signupResponse);

  response.cookies.set({
    name: COOKIE_NAMES.VERIFY_EMAIL_PENDING,
    value: signupResponse.data.email,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
  
  return response;
}