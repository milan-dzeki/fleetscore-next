import type { PageWithIdParamsType } from '@/types/props/common';
import { getRegattaById } from '@/customApi/regattas/regattasApiClient';
import { getTranslations } from '@/i18n';
import { REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import FormActionMessage from '@/components/forms/FormActionMessage';

const SingleRegattaPage = async ({
  params: {
    lng,
    id
  }
}: PageWithIdParamsType) => {
  const { t } = await getTranslations(lng, REGATTA_PAGE_NS);
  const response = await getRegattaById(id);

  if (!response.success) {
    return (
      <>
        <PageTitle title={t('title')} />
        <FormActionMessage isError message={response.message} />
      </>
    );
  }

  const {
    name
  } = response.data;

  return (
    <>
      <PageTitle title={name} />
    </>
  );
};

export default SingleRegattaPage;