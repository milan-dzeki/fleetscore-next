import { unstable_cache } from 'next/cache';
import type { FormType } from '@/types/forms';
import type { SelectCheckboxesInputType, SelectInputType } from '@/types/inputs';
import RegattasApi from './regattasApi';
import { getOrganisations } from '../organisations/organisationsApiClient';
import { getSailingClasses } from '../sailingClasses/sailingClassesApiClient';
import { generateCreateRegattaForm } from '@/configs/forms/generators/regattas/createRegattaForm';

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

export const deleteRegatta = async (id: number) => {
  const regattasApi = new RegattasApi({});
  const response = await regattasApi.delete(id);
  return response;
};

export const getCreateRegattaForm = async (
  t: (key: string) => string
): Promise<FormType | { error: string }> => {
  const [organisations, sailingClasses] = await Promise.all([
    getOrganisations(),
    getSailingClasses()
  ]);

  if (!organisations.success || !sailingClasses.success) {
    return { error: t('errorFetchingCreateData') };
  }

  const createRegattaForm = generateCreateRegattaForm(t);

  const organisationsForList = organisations.data.map((org) => ({
    id: org.id,
    value: org.name
  }));
  const sailingClassesList = sailingClasses.data.map((sc) => ({
    id: sc.id,
    value: sc.name,
    checked: false
  }));

  const formWithAllData: FormType = {
    ...createRegattaForm,
    inputs: {
      ...createRegattaForm.inputs,
      organisationId: {
        ...(createRegattaForm.inputs.organisationId as SelectInputType),
        options: organisationsForList,
        searchedOptions: organisationsForList
      },
      sailingClassIds: {
        ...(createRegattaForm.inputs.sailingClassIds as SelectCheckboxesInputType),
        options: sailingClassesList,
        searchedOptions: sailingClassesList
      }
    }
  };

  return formWithAllData;
};