import React from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { getTranslations } from '@/i18n';
import type { LngParamsType } from '@/types/props/common';
import { getProfile } from '@/customApi/auth/authUtils';
import ROUTE_PATHS from '@/configs/routePaths';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import SERVER_METHODS from '@/configs/server/methods';
import { CREATE_REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';
import { generateCreateRegattaForm } from '@/configs/forms/generators/regattas/createRegattaForm';
import { getOrganisations } from '@/customApi/organisations/organisationsApiClient';
import PageTitle from '@/components/layout/PageTitle';
import Form from '@/components/forms/Form';
import { FormType } from '@/types/forms';
import { SelectCheckboxesInputType, SelectInputType } from '@/types/inputs';
import { getSailingClasses } from '@/customApi/sailingClasses/sailingClassesApiClient';

const apiConfig = {
  endpoint: API_ENDPOINTS.ORGANISATIONS.create,
  method: SERVER_METHODS.POST
};

const CreateRegataPage = async ({ params: { lng } }: LngParamsType) => {
  const profileResponse = await getProfile();
  if (!profileResponse.success) {
    redirect(`/${lng}${ROUTE_PATHS.AUTH.login}`, RedirectType.replace);
  }

  const { t } = await getTranslations(lng, CREATE_REGATTA_PAGE_NS);
  const createRegattaForm = generateCreateRegattaForm(t);

  const [organisations, sailingClasses] = await Promise.all([
    getOrganisations(),
    getSailingClasses()
  ]);

  if (!organisations.success || !sailingClasses.success) {
    return null;
  }
  const organisationsForList = organisations.data.map((org) => ({
    id: org.id,
    value: org.name
  }));
  const sailingClassesList = sailingClasses.data.map((sc) => ({
    id: sc.id,
    value: sc.name,
    checked: false
  }));

  const formWithOrganisation: FormType = {
    ...createRegattaForm,
    inputs: {
      ...createRegattaForm.inputs,
      organisation: {
        ...(createRegattaForm.inputs.organisation as SelectInputType),
        options: organisationsForList,
        searchedOptions: organisationsForList
      },
      sailingClasses: {
        ...(createRegattaForm.inputs.sailingClasses as SelectCheckboxesInputType),
        options: sailingClassesList,
        searchedOptions: sailingClassesList
      }
    }
  };

  return (
    <>
      <PageTitle title={t('title')} />
      <Form
        generatedForm={formWithOrganisation}
        apiConfig={apiConfig}
        submitText={t('create')}
      />
    </>
  );
};

export default CreateRegataPage