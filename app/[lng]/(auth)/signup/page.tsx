import AuthFormSwitch from '@/components/forms/AuthFormSwitch';
import Form from '@/components/forms/Form';
import PageTitle from '@/components/layout/PageTitle';
import { generateSignupForm } from '@/configs/forms/signupForm';
import { getTranslations } from '@/i18n';
import { SIGNUP_PAGE_NS } from '@/i18n/namespaces/pages';

async function SignupPage({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await getTranslations(lng, SIGNUP_PAGE_NS);
  const signupForm = generateSignupForm(t);

  return (
    <>
      <PageTitle title={t('title')} />
      <Form generatedForm={signupForm} submitText={t('create')}>
        <AuthFormSwitch switchText={t('haveAccount')} linkPath={`/${lng}/login`} linkText={t('switchLogin')} />
      </Form>
    </>
  );
}

export default SignupPage;