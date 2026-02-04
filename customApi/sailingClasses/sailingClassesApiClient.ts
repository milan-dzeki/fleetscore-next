import SailingClassesApi from './sailingClassesApi';

export const getSailingClasses = async () => {
  const sailingClassesApi = new SailingClassesApi({ locale: 'en' });
  return await sailingClassesApi.get();
};