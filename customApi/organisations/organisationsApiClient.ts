import OrganisationsApi from './organisationsApi';
import { unstable_cache } from 'next/cache';

export const getOrganisations = unstable_cache(async () => {
  const organisationsApi = new OrganisationsApi({});
  const response = await organisationsApi.get();

  return response;
}, ['organisations'], {
  tags: ['organisations']
});

export const getOrganisationById = unstable_cache(async (id: string) => {
  const organisationsApi = new OrganisationsApi({ searchParams: `/${id}` });
  const response = await organisationsApi.getById();

  return response;
}, ['organisations'], {
  tags: ['organisations']
});