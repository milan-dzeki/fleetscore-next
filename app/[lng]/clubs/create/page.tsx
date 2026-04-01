import React from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { getTranslations } from '@/i18n';
import type { LngParamsType } from '@/types/props/common';
import { getProfile } from '@/customApi/auth/authUtils';
import ROUTE_PATHS from '@/configs/routePaths';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import SERVER_METHODS from '@/configs/server/methods';
import { CREATE_CLUB_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import Form from '@/components/forms/Form';
import { getCreateClubForm } from '@/customApi/clubs/clubsApiClient';
import FormActionMessage from '@/components/forms/FormActionMessage';

const apiConfig = {
  endpoint: API_ENDPOINTS.CLUBS.create,
  method: SERVER_METHODS.POST
};

const CreateClubPage = async ({ params: { lng } }: LngParamsType) => {
  const profileResponse = await getProfile();
  if (!profileResponse.success) {
    redirect(`/${lng}${ROUTE_PATHS.AUTH.login}`, RedirectType.replace);
  }

  const { t } = await getTranslations(lng, CREATE_CLUB_PAGE_NS);
  const createClubForm = await getCreateClubForm(t);

  return (
    <>
      <PageTitle title={t('title')} />
      {
        'error' in createClubForm
          ? <FormActionMessage isError message={createClubForm.error} />
          : (
            <Form
              generatedForm={createClubForm}
              apiConfig={apiConfig}
              submitText={t('create')}
            />
          )  
      }
    </>
  );
};

export default CreateClubPage