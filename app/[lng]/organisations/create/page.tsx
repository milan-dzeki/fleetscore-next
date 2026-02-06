import { redirect, RedirectType } from 'next/navigation';
import type { LngParamsType } from '@/types/props/common';
import { getProfile } from '@/customApi/auth/authUtils';
import { getTranslations } from '@/i18n';
import { generateCreateOrganisationForm } from '@/configs/forms/generators/organisations/createOrganisationForm';
import { CREATE_ORGANISATION_PAGE_NS } from '@/i18n/namespaces/pages';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import ROUTE_PATHS from '@/configs/routePaths';
import SERVER_METHODS from '@/configs/server/methods';
import PageTitle from '@/components/layout/PageTitle';
import Form from '@/components/forms/Form';

const apiConfig = {
  endpoint: API_ENDPOINTS.ORGANISATIONS.create,
  method: SERVER_METHODS.POST
};

const CreateOrganisationPage = async ({ params: { lng } }: LngParamsType) => {
  const profileResponse = await getProfile();
  if (!profileResponse.success) {
    redirect(`/${lng}${ROUTE_PATHS.AUTH.login}`, RedirectType.replace);
  }

  const { t } = await getTranslations(lng, CREATE_ORGANISATION_PAGE_NS);
  const createOrganisationForm = generateCreateOrganisationForm(t);

  return (
    <>
      <PageTitle title={t('title')} />
      <Form
        generatedForm={createOrganisationForm}
        apiConfig={apiConfig}
        submitText={t('create')}
      />
    </>
  );
};

export default CreateOrganisationPage;