import type { LngParamsType } from '@/types/props/common';
import AuthFormSwitch from '@/components/forms/AuthFormSwitch';
import Form from '@/components/forms/Form';
import PageTitle from '@/components/layout/PageTitle';
import { generateSignupForm } from '@/configs/forms/generators/signupForm';
import { getTranslations } from '@/i18n';
import { SIGNUP_PAGE_NS } from '@/i18n/namespaces/pages';
import { signup } from '@/serverActions/auth';

const SignupPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, SIGNUP_PAGE_NS);
  const signupForm = generateSignupForm(t);

  return (
    <>
      <PageTitle title={t('title')} />
      <Form
        generatedForm={signupForm}
        submitText={t('create')}
        action={signup}
      >
        <AuthFormSwitch switchText={t('haveAccount')} linkPath={`/${lng}/login`} linkText={t('switchLogin')} />
      </Form>
    </>
  );
}

export default SignupPage;