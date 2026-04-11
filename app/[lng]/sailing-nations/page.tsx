import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { SAILING_NATIONS_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';

const SailingNationsPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, SAILING_NATIONS_NS);
  return (
    <>
      <PageTitle title={t('title')} />
    </>
  );
};

export default SailingNationsPage;