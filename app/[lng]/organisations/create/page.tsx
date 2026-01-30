import { redirect } from 'next/navigation';
import type { LngParamsType } from '@/types/props/common';
import { getProfile } from '@/customApi/auth/authUtils';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import ROUTE_PATHS from '@/configs/routePaths';


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
  return (
    <div>CreateOrganisationPage</div>
  );
};

export default CreateOrganisationPage;