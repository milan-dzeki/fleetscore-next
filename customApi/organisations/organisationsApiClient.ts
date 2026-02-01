import OrganisationsApi from './organisationsApi';
import { unstable_cache } from 'next/cache';

export const getOrganisations = unstable_cache(async () => {
  const organisationsApi = new OrganisationsApi({ locale: 'en' });
  const response = await organisationsApi.get();

  return response;
}, ['organisations'], {
  tags: ['organisations']
});