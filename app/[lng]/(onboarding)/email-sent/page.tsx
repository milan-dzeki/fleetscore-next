import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Trans } from 'react-i18next/TransWithoutContext';
import type { LngParamsType } from '@/types/props/common';
import { EMAIL_SENT_PAGE_NS } from '@/i18n/namespaces/pages';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import { removeVerificationEmailCookie } from '@/serverActions/auth';
import { getTranslations } from '@/i18n';
import PageTitle from '@/components/layout/PageTitle';
import TextBox from '@/components/boxes/TextBox';
import Container from '@/components/layout/Container';
import ResendVerificationForm from '@/components/forms/ResendVerificationForm';
import RedirectButton from '@/components/buttons/RedirectButton';
import ROUTE_PATHS from '@/configs/routePaths';

const EmailSentPage = async ({ params: { lng } }: LngParamsType) => {
  const cookieStore = cookies();
  const pendingEmail = cookieStore.get(COOKIE_NAMES.VERIFY_EMAIL_PENDING)?.value;
  if (!pendingEmail) {
    redirect(ROUTE_PATHS.AUTH.signup);
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
        <TextBox childrenFlex>
          <p>{t('notYourEmail')}</p>
          <form action={removeVerificationEmailCookie.bind(null, ROUTE_PATHS.AUTH.signup)}>
            <RedirectButton text={t('redirectSignup')} />
          </form>
        </TextBox>
        <TextBox 
          text={t('noEmail')}
        />
        <ResendVerificationForm btnText={t('resend')} />
      </Container>
    </>
  );
};

export default EmailSentPage