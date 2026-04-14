import { NextResponse } from 'next/server';
import SailingNationsApi from '@/customApi/sailingNations/sailingNationsApi';

export async function GET () {
  const sailingNationsApi = new SailingNationsApi({});
  const response = await sailingNationsApi
    .get();

  return NextResponse.json(response, { status: response.statusCode });
}