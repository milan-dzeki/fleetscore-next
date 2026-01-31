import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { generateForgotPasswordForm } from '@/configs/forms/generators/auth/forgotPasswordForm';
import { FORGOT_PASSWORD_PAGE } from '@/i18n/namespaces/pages';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import SERVER_METHODS from '@/configs/server/methods';
import AuthRedirectGuard from '@/components/redirects/AuthRedirectGuard';
import PageTitle from '@/components/layout/PageTitle';
import Form from '@/components/forms/Form';

const apiConfig = {
  endpoint: API_ENDPOINTS.AUTH.forgotPassword,
  method: SERVER_METHODS.POST
};

const ForgotPasswordPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, FORGOT_PASSWORD_PAGE);
  const forgotPasswordForm = generateForgotPasswordForm(t);

  return (
    <>
      <AuthRedirectGuard />
      <PageTitle title={t('title')} />
      <Form
        generatedForm={forgotPasswordForm}
        submitText={t('request')}
        apiConfig={apiConfig}
      />
    </>
  );
};

export default ForgotPasswordPage