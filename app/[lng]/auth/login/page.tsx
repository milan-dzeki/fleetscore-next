import type { LngParamsType } from '@/types/props/common';
import { generateLoginForm } from '@/configs/forms/generators/auth/loginForm';
import { getTranslations } from '@/i18n';
import { LOGIN_PAGE_NS } from '@/i18n/namespaces/pages';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import SERVER_METHODS from '@/configs/server/methods';
import ROUTE_PATHS from '@/configs/routePaths';
import AuthFormSwitch from '@/components/forms/AuthFormSwitch';
import Form from '@/components/forms/Form';
import PageTitle from '@/components/layout/PageTitle';
import StoreLoginUserHandler from '@/components/handlers/StoreLoginUserHandler';
import AuthRedirectGuard from '@/components/redirects/AuthRedirectGuard';

const apiConfig = {
  endpoint: API_ENDPOINTS.AUTH.login,
  method: SERVER_METHODS.POST
};

const LoginPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, LOGIN_PAGE_NS);
  const loginForm = generateLoginForm(t);

  const forgotPasswordTexts = {
    text: t('forgotPasswordText'),
    linkText: t('forgotPasswordLinkText'),
    linkPath: `/${lng}${ROUTE_PATHS.AUTH.forgotPassword}`
  };

  return (
    <>
      <AuthRedirectGuard />
      <PageTitle title={t('title')} />
      <Form
        generatedForm={loginForm}
        submitText={t('login')}
        apiConfig={apiConfig}
        HandlerComp={StoreLoginUserHandler}
      >
        <AuthFormSwitch
          switchText={t('dontHaveAccount')}
          linkPath={`/${lng}${ROUTE_PATHS.AUTH.signup}`}
          linkText={t('createAccount')}
          forgotPasswordTexts={forgotPasswordTexts}
        />
      </Form>
    </>
  );
};

export default LoginPage;
