import Form from '@/components/Form';
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
      <Form generatedForm={signupForm} />
    </>
  );
}

export default SignupPage;