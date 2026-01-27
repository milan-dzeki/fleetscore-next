import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { CREATE_PROFILE_PAGE_NS } from '@/i18n/namespaces/pages';
import { generateCreateProfileForm } from '@/configs/forms/generators/createProfileForm';
import { createProfile } from '@/serverActions/profile';
import PageTitle from '@/components/layout/PageTitle';
import Form from '@/components/forms/Form';

const CreateProfilePage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, CREATE_PROFILE_PAGE_NS);
  const createProfileForm = generateCreateProfileForm(t);

  return (
    <>  
      <PageTitle title={t('title')} />
      <Form
        generatedForm={createProfileForm}
        submitText={t('createProfile')}
        action={createProfile}
        redirectUrl="/"
      />
    </>
  );
};

export default CreateProfilePage