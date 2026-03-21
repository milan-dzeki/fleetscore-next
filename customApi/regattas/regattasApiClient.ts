import { unstable_cache } from 'next/cache';
import RegattasApi from './regattasApi';

export const getRegattas = unstable_cache(async () => {
  const regattasApi = new RegattasApi({});
  const response = await regattasApi.get();
  return response;
}, ['regattas'], {
  tags: ['regattas']
});

export const getRegattaById = unstable_cache(async (id: string) => {
  const regattasApi = new RegattasApi({ searchParams: `/${id}` });
  const response = await regattasApi.getById();

  return response;
}, ['regattas'], {
  tags: ['regattas']
});