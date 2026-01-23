import type { LngParamsType } from '@/types/props/common';
import AuthFormSwitch from '@/components/forms/AuthFormSwitch';
import Form from '@/components/forms/Form';
import PageTitle from '@/components/layout/PageTitle';
import { generateLoginForm } from '@/configs/forms/loginForm';
import { getTranslations } from '@/i18n';
import { LOGIN_PAGE_NS } from '@/i18n/namespaces/pages';

const LoginPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, LOGIN_PAGE_NS);
  const signupForm = generateLoginForm(t);

  return (
    <>
      <PageTitle title={t('title')} />
      <Form generatedForm={signupForm} submitText={t('login')}>
        <AuthFormSwitch switchText={t('dontHaveAccount')} linkPath={`/${lng}/signup`} linkText={t('createAccount')} />
      </Form>
    </>
  );
};

export default LoginPage;