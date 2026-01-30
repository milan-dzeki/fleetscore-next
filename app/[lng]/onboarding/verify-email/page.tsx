import type { LngParamsType } from '@/types/props/common';
import { VERIFY_EMAIL_PAGE_NS } from '@/i18n/namespaces/pages';
import { getTranslations } from '@/i18n';
import Container from '@/components/layout/Container';
import FormActionMessage from '@/components/forms/FormActionMessage';
import { redirect } from 'next/navigation';
import RedirectButton from '@/components/buttons/RedirectButton';
import ROUTE_PATHS from '@/configs/routePaths';
import DeleteCookoe from '@/components/DeleteCookoe';
import SERVER_METHODS from '@/configs/server/methods';

interface Props {
  searchParams: { token: string };
}

const VerifyEmailPage = async ({
  params: { lng },
  searchParams: { token }
}: LngParamsType & Props) => {
  const { t } = await getTranslations(lng, VERIFY_EMAIL_PAGE_NS);

  if (!token) {
    redirect(ROUTE_PATHS.AUTH.login);
  }

  const response = await fetch(`${process.env.API_BASE_URL}/auth/verify?token=${token}`, {
    method: SERVER_METHODS.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });
  
  if (!response.ok) {
    return (
      <Container>
        <FormActionMessage isError message={t('invalidToken')} />
        <form>
          <RedirectButton text="login" center />
        </form>
      </Container>
    );
  }
  const data = await response.json();

  return (
    <Container>
      <DeleteCookoe />
      <FormActionMessage isError={false} message={data.message || t('verificationSuccess')} />
    </Container>
  );
};

export default VerifyEmailPage;