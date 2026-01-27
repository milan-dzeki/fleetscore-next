import type { LngParamsType } from '@/types/props/common';
import { generateLoginForm } from '@/configs/forms/generators/loginForm';
import { getTranslations } from '@/i18n';
import { LOGIN_PAGE_NS } from '@/i18n/namespaces/pages';
import { login } from '@/serverActions/auth';
import AuthFormSwitch from '@/components/forms/AuthFormSwitch';
import Form from '@/components/forms/Form';
import PageTitle from '@/components/layout/PageTitle';
import { BaseApiResponseType } from '@/types/customApi/baseApi';
import { ProfileApiResponseType } from '@/types/customApi/profileApi';
import StoreLoginUserHandler from '@/components/handlers/StoreLoginUserHandler';

const LoginPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, LOGIN_PAGE_NS);
  const loginForm = generateLoginForm(t);

  return (
    <>
      <PageTitle title={t('title')} />
      <Form<ProfileApiResponseType, BaseApiResponseType<ProfileApiResponseType>>
        generatedForm={loginForm}
        submitText={t('login')}
        action={login}
        HandlerComp={StoreLoginUserHandler}
      >
        <AuthFormSwitch switchText={t('dontHaveAccount')} linkPath={`/${lng}/signup`} linkText={t('createAccount')} />
      </Form>
    </>
  );
};

export default LoginPage;
