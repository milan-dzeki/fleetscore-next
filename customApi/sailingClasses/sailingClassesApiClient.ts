import { unstable_cache } from 'next/cache';
import SailingClassesApi from './sailingClassesApi';

export const getSailingClasses = unstable_cache(async () => {
  const sailingClassesApi = new SailingClassesApi({});
  return await sailingClassesApi.get();
});