import { unstable_cache } from 'next/cache';
import RegattasApi from './regattasApi';

export const getRegattaById = unstable_cache(async (id: string) => {
  const regattasApi = new RegattasApi({ searchParams: `/${id}` });
  const response = await regattasApi.getById();

  return response;
}, ['regattas'], {
  tags: ['regattas']
});