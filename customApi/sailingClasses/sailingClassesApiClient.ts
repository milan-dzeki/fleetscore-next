import SailingClassesApi from './sailingClassesApi';

export const getSailingClasses = async () => {
  const sailingClassesApi = new SailingClassesApi({});
  return await sailingClassesApi.get();
};