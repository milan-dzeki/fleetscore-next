import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { ORGANISATIONS_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';

const OrganisationsPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, ORGANISATIONS_PAGE_NS);
  return (
    <>
      <PageTitle title={t('title')} />
    </>
  );
};

export default OrganisationsPage;