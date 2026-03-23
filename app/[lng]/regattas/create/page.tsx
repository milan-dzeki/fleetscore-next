import React from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { getTranslations } from '@/i18n';
import type { LngParamsType } from '@/types/props/common';
import { getProfile } from '@/customApi/auth/authUtils';
import ROUTE_PATHS from '@/configs/routePaths';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import SERVER_METHODS from '@/configs/server/methods';
import { CREATE_REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';
import { getCreateRegattaForm } from '@/customApi/regattas/regattasApiClient';
import PageTitle from '@/components/layout/PageTitle';
import Form from '@/components/forms/Form';
import FormActionMessage from '@/components/forms/FormActionMessage';

const apiConfig = {
  endpoint: API_ENDPOINTS.REGATTAS.create,
  method: SERVER_METHODS.POST
};

const CreateRegataPage = async ({ params: { lng } }: LngParamsType) => {
  const profileResponse = await getProfile();
  if (!profileResponse.success) {
    redirect(`/${lng}${ROUTE_PATHS.AUTH.login}`, RedirectType.replace);
  }

  const { t } = await getTranslations(lng, CREATE_REGATTA_PAGE_NS);
  const createRegattaForm = await getCreateRegattaForm(t);

  return (
    <>
      <PageTitle title={t('title')} />
      {
        'error' in createRegattaForm
          ? <FormActionMessage isError message={createRegattaForm.error} />
          : (
            <Form
              generatedForm={createRegattaForm}
              apiConfig={apiConfig}
              submitText={t('create')}
            />
          )  
      }
    </>
  );
};

export default CreateRegataPage