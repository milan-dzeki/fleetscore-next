import { getTranslations } from '@/i18n';
import type { LngParamsType } from '@/types/props/common';
import ROUTE_PATHS from '@/configs/routePaths';
import { generateSignupForm } from '@/configs/forms/generators/auth/signupForm';
import { SIGNUP_PAGE_NS } from '@/i18n/namespaces/pages';
import AuthFormSwitch from '@/components/forms/AuthFormSwitch';
import Form from '@/components/forms/Form';
import PageTitle from '@/components/layout/PageTitle';
import AuthRedirectGuard from '@/components/redirects/AuthRedirectGuard';
import SERVER_METHODS from '@/configs/server/methods';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';

const apiConfig = {
  endpoint: API_ENDPOINTS.AUTH.signup,
  method: SERVER_METHODS.POST
};

const SignupPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, SIGNUP_PAGE_NS);
  const signupForm = generateSignupForm(t);

  return (
    <>
      <AuthRedirectGuard locale={lng}  />
      <PageTitle title={t('title')} />
      <Form
        generatedForm={signupForm}
        submitText={t('create')}
        apiConfig={apiConfig}
        redirectUrl={`/${lng}${ROUTE_PATHS.ONBOARDING.emailSent}`}
      >
        <AuthFormSwitch
          switchText={t('haveAccount')}
          linkPath={`/${lng}${ROUTE_PATHS.AUTH.login}`}
          linkText={t('switchLogin')}
        />
      </Form>
    </>
  );
}

export default SignupPage;