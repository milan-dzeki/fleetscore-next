import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Trans } from 'react-i18next/TransWithoutContext';
import type { LngParamsType } from '@/types/props/common';
import { EMAIL_SENT_PAGE_NS } from '@/i18n/namespaces/pages';
import { getTranslations } from '@/i18n';
import PageTitle from '@/components/layout/PageTitle';
import TextBox from '@/components/boxes/TextBox';
import Container from '@/components/layout/Container';
import ResendVerificationForm from '@/components/forms/ResendVerificationForm';

const EmailSentPage = async ({ params: { lng } }: LngParamsType) => {
  const cookieStore = cookies();
  const isValidSignup = cookieStore.get('signup_success')?.value === 'true';
  const pendingEmail = cookieStore.get('pending_email')?.value;
  if (!isValidSignup || !pendingEmail) {
    redirect('/signup');
  }

  const { t } = await getTranslations(lng, EMAIL_SENT_PAGE_NS);

  return (
    <>
      <PageTitle title={t('title')} />
      <Container>
        <TextBox
          text={
            <p>
              <Trans 
                i18nKey="emailSent"
                values={{ email: pendingEmail }}
                components={{ 1: <strong /> }}
                t={t}
              />
            </p>
          }
          textAlign="center"
        />
        <TextBox 
          text={t('noEmail')}
        />
        <ResendVerificationForm btnText={t('resend')} />
      </Container>
    </>
  );
};

export default EmailSentPage