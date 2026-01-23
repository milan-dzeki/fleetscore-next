import type { LngParamsType } from '@/types/props/common';
import AuthFormSwitch from '@/components/forms/AuthFormSwitch';
import Form from '@/components/forms/Form';
import PageTitle from '@/components/layout/PageTitle';
import { generateLoginForm } from '@/configs/forms/generators/loginForm';
import { getTranslations } from '@/i18n';
import { LOGIN_PAGE_NS } from '@/i18n/namespaces/pages';
import { login } from '@/serverActions/auth';

const LoginPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, LOGIN_PAGE_NS);
  const loginForm = generateLoginForm(t);

  return (
    <>
      <PageTitle title={t('title')} />
      <Form generatedForm={loginForm} submitText={t('login')} action={login}>
        <AuthFormSwitch switchText={t('dontHaveAccount')} linkPath={`/${lng}/signup`} linkText={t('createAccount')} />
      </Form>
    </>
  );
};

export default LoginPage;