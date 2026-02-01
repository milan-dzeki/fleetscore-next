import Link from 'next/link';
import type { LngParamsType } from '@/types/props/common'
import { getTranslations } from '@/i18n';
import { RESET_PASSWORD_PAGE_NS } from '@/i18n/namespaces/pages';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import SERVER_METHODS from '@/configs/server/methods';
import { generateResetPasswordForm } from '@/configs/forms/generators/auth/resetPasswordForm';
import ROUTE_PATHS from '@/configs/routePaths';
import PageTitle from '@/components/layout/PageTitle';
import Container from '@/components/layout/Container';
import TextBox from '@/components/boxes/TextBox';
import Form from '@/components/forms/Form';

const apiConfig = {
  endpoint: API_ENDPOINTS.AUTH.resetPassword,
  method: SERVER_METHODS.POST,
};

interface Props {
  searchParams: { token: string };
}

const ResetPasswordPage = async ({
  params: { lng },
  searchParams: { token }
}: LngParamsType & Props) => {
  const { t } = await getTranslations(lng, RESET_PASSWORD_PAGE_NS);

  if (!token) {
    return (
      <>
        <PageTitle title={t('title')} />
        <Container>
          <TextBox text={
            <p>
              <span>{t('tokenMissing')}</span>
              <Link href={`/${lng}${ROUTE_PATHS.AUTH.forgotPassword}`}>{t('resend')}</Link>
            </p>
          } />
        </Container>
      </>
    );
  }

  const resetPasswordForm = generateResetPasswordForm(t);

  return (
    <>
      <PageTitle title={t('title')} />
      <Form
        generatedForm={resetPasswordForm}
        submitText={t('reset')}
        apiConfig={apiConfig}
        extraReqBodyFields={{ token }}
        redirectUrl={`/${lng}${ROUTE_PATHS.AUTH.login}`}
      />
    </>
  );
};

export default ResetPasswordPage;