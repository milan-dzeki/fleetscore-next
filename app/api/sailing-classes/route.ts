import { NextResponse } from 'next/server';
import SailingClassesApi from '@/customApi/sailingClasses/sailingClassesApi';

export async function GET () {
  const regattasApi = new SailingClassesApi({});
  const response = await regattasApi
    .get();

  return NextResponse.json(response, { status: response.statusCode });
}