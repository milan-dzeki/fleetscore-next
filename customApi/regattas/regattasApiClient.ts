import { unstable_cache } from 'next/cache';
import type { FormType } from '@/types/forms';
import { INPUT_TYPES, type SelectCheckboxesInputType, type SelectInputType } from '@/types/inputs';
import type { TranslationFunctionType } from '@/types/commons';
import type { RegattaType } from '@/types/entities';
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

export const getRegattaById = async (id: string) => {
  const regattasApi = new RegattasApi({});
  const response = await regattasApi.getById(id);

  return response;
};

export const getCreateRegattaForm = async (t: TranslationFunctionType): Promise<FormType | { error: string }> => {
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

export const getEditRegattaForm = async (
  t: TranslationFunctionType,
  regatta: RegattaType
) => {
  const formWithAllData = await getCreateRegattaForm(t);

  if ('error' in formWithAllData) {
    return { error: t('errorFetchingCreateData') };
  }

  const populatedInputs = {
    ...formWithAllData.inputs
  };

  for (const input in populatedInputs) {
    if (input in regatta) {
      const regataProp = regatta[input as keyof typeof regatta];
      if (
        populatedInputs[input].inputType === INPUT_TYPES.TEXT &&
        (typeof regataProp === 'string' || typeof regataProp === 'number')
      ) {
        populatedInputs[input].value = regataProp.toString();
      }
    }
  }

  return {
    formWithAllData,
    inputs: populatedInputs
  };
};