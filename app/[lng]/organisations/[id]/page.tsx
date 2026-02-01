import type { PageWithIdParamsType } from '@/types/props/common';
import { getOrganisationById } from '@/customApi/organisations/organisationsApiClient';
import { getTranslations } from '@/i18n';
import { ORGANISATION_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import FormActionMessage from '@/components/forms/FormActionMessage';

const OrganisationPage = async ({
  params: {
    lng,
    id
  }
}: PageWithIdParamsType) => {
  const { t } = await getTranslations(lng, ORGANISATION_PAGE_NS);
  const response = await getOrganisationById(id);

  if (!response.success) {
    return (
      <>
        <PageTitle title={t('title')} />
        <FormActionMessage isError message={response.message} />
      </>
    );
  }

  return (
    <>
      <PageTitle title={response.data.name} />
    </>
  );
};

export default OrganisationPage;