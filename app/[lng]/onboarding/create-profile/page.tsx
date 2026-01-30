import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { CREATE_PROFILE_PAGE_NS } from '@/i18n/namespaces/pages';
import { generateCreateProfileForm } from '@/configs/forms/generators/createProfileForm';
import PageTitle from '@/components/layout/PageTitle';
import Form from '@/components/forms/Form';
import { cookies } from 'next/headers';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import { redirect } from 'next/navigation';
import ROUTE_PATHS from '@/configs/routePaths';
import UpdateUserProfile from '@/components/handlers/UpdateUserProfile';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import SERVER_METHODS from '@/configs/server/methods';

const apiConfig = {
  endpoint: API_ENDPOINTS.PROFILE.create,
  method: SERVER_METHODS.PUT
};

const CreateProfilePage = async ({ params: { lng } }: LngParamsType) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const pendingProfileVerification = cookieStore.get(COOKIE_NAMES.CREATE_PROFILE_PENDING)?.value; 

  if (!pendingProfileVerification) {
    if (accessToken) {
      redirect(`/${lng}${ROUTE_PATHS.HOME.root}`);
    }

    redirect(`/${lng}${ROUTE_PATHS.AUTH.login}`);
  }

  if (!accessToken && pendingProfileVerification) {
    redirect(
      `${API_ENDPOINTS.AUTH.refreshToken}?successRedirectUrl=/${lng}${ROUTE_PATHS.ONBOARDING.createProfile}`
    );
  }

  const { t } = await getTranslations(lng, CREATE_PROFILE_PAGE_NS);
  const createProfileForm = generateCreateProfileForm(t);

  return (
    <>  
      <PageTitle title={t('title')} />
      <Form
        generatedForm={createProfileForm}
        submitText={t('createProfile')}
        apiConfig={apiConfig}
        HandlerComp={UpdateUserProfile}
      />
    </>
  );
};

export default CreateProfilePage