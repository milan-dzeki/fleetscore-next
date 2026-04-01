import type { TranslationFunctionType } from '@/types/commons';
import type { FormType } from '@/types/forms';
import type { SelectInputType } from '@/types/inputs';
import { getOrganisations } from '../organisations/organisationsApiClient';
import { generateCreateClubForm } from '@/configs/forms/generators/clubs/createClubForm';
import ClubsApi from './clubsApi';

export const getClubs = async () => {
  const clubsApi = new ClubsApi({});
  return await clubsApi.get();
};

export const getClubById = async (id: string | number) => {
  const clubsApi = new ClubsApi({});
  return await clubsApi.getById(id);
};

export const getCreateClubForm = async (
  t: TranslationFunctionType
): Promise<FormType | { error: string }> => {
  const organisations = await getOrganisations();

  if (!organisations.success) {
    return { error: t('errorFetchingCreateData') };
  }

  const createClubForm = generateCreateClubForm(t);

  const organisationsForList = organisations.data.map((org) => ({
    id: org.id,
    value: org.name
  }));

  const formWithAllData: FormType = {
      ...createClubForm,
      inputs: {
        ...createClubForm.inputs,
        organisationId: {
          ...(createClubForm.inputs.organisationId as SelectInputType),
          options: organisationsForList,
          searchedOptions: organisationsForList
        },
      }
    };
  
    return formWithAllData;
};