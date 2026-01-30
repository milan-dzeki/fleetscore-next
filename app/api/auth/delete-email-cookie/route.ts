import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAMES.VERIFY_EMAIL_PENDING);
  return NextResponse.json({ success: true });
}