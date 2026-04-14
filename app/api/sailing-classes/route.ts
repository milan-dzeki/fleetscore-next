import { NextResponse } from 'next/server';
import SailingClassesApi from '@/customApi/sailingClasses/sailingClassesApi';

export async function GET () {
  const sailingClassesApi = new SailingClassesApi({});
  const response = await sailingClassesApi
    .get();

  return NextResponse.json(response, { status: response.statusCode });
}