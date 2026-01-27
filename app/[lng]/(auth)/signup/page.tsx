import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from '@/i18n';
import type { LngParamsType } from '@/types/props/common';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import ROUTE_PATHS from '@/configs/routePaths';
import { generateSignupForm } from '@/configs/forms/generators/signupForm';
import { SIGNUP_PAGE_NS } from '@/i18n/namespaces/pages';
import { signup } from '@/serverActions/auth';
import AuthFormSwitch from '@/components/forms/AuthFormSwitch';
import Form from '@/components/forms/Form';
import PageTitle from '@/components/layout/PageTitle';
import { BaseApiRawResponseType } from '@/types/customApi/baseApi';

const SignupPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, SIGNUP_PAGE_NS);
  const signupForm = generateSignupForm(t);

  const cookieStore = cookies();
  const verificationEmailCookie = cookieStore.get(COOKIE_NAMES.VERIFY_EMAIL_PENDING);

  if (verificationEmailCookie) {
    redirect(ROUTE_PATHS.ONBOARDING.emailSent);
  }

  return (
    <>
      <PageTitle title={t('title')} />
      <Form<null, BaseApiRawResponseType>
        generatedForm={signupForm}
        submitText={t('create')}
        action={signup}
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