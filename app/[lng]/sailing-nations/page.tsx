import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { SAILING_NATIONS_NS } from '@/i18n/namespaces/pages';
import { getSailingNations } from '@/customApi/sailingNations/sailingNationsApiClient';
import PageTitle from '@/components/layout/PageTitle';
import Container from '@/components/layout/Container';
import SailingNation from '@/components/sailingNations/SailingNation';

const SailingNationsPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, SAILING_NATIONS_NS);
  const response = await getSailingNations();
  
  if (!response.success) {
    return <p>Error getting sailing nations</p>
  }

  const translations = {
    code: t('code'),
    countryName: t('countryName')
  };

  return (
    <>
      <PageTitle title={t('title')} />
      <Container>
        {response.data.map((sNation) => (
          <SailingNation key={sNation.id} sailingNation={sNation} translations={translations} />
        ))}
      </Container>
    </>
  );
};

export default SailingNationsPage;