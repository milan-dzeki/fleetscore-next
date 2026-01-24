import type { LngParamsType } from '@/types/props/common';
import { VERIFY_EMAIL_PAGE_NS } from '@/i18n/namespaces/pages';
import { getTranslations } from '@/i18n';
import Container from '@/components/layout/Container';
import FormActionMessage from '@/components/forms/FormActionMessage';

interface Props {
  searchParams: { token: string };
}

const VerifyEmailPage = async ({
  params: { lng },
  searchParams: { token }
}: LngParamsType & Props) => {
  const { t } = await getTranslations(lng, VERIFY_EMAIL_PAGE_NS);

  if (!token) {
    return (
      <Container>
        <FormActionMessage isError message={t('invalidToken')} />
      </Container>
    );
  }

  const response = await fetch(`${process.env.API_BASE_URL}/auth/verify?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log('response', response);
  if (!response.ok) {
    return (
      <Container>
        <FormActionMessage isError message={t('invalidToken')} />
      </Container>
    );
  }
  const data = await response.json();

  console.log('date', data);

  return (
    <Container>
      <FormActionMessage isError={false} message={data.message || t('verificationSuccess')} />
    </Container>
  );
};

export default VerifyEmailPage;