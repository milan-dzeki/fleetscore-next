import { redirect } from 'next/navigation';
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
  const profileResponse = await getProfile(lng);

  if (!profileResponse.success && profileResponse.statusCode === 401) {
    redirect(
      `${API_ENDPOINTS.AUTH.refreshToken}?successRedirectUrl=/${lng}${ROUTE_PATHS.ORGANISATIONS.create}&failRedirectUrl=/${lng}${ROUTE_PATHS.AUTH.login}`
    );
  } 

  if ((!profileResponse.success && profileResponse.statusCode !== 401) || (profileResponse.success && !profileResponse.data.profileCreated)) {
    redirect(`/${lng}${ROUTE_PATHS.AUTH.login}`);
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