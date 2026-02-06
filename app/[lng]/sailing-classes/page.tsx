import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { getSailingClasses } from '@/customApi/sailingClasses/sailingClassesApiClient';
import { SAILING_CLASSES_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import Container from '@/components/layout/Container';
import SailingClassesContainer from '@/components/sailingClasses/SailingClassesContainer';

const SailingClassesPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, SAILING_CLASSES_PAGE_NS);
  const response = await getSailingClasses();

  if (!response.success) {
    return <p>Error getting sailing classes</p>
  }

  return (
    <>
      <PageTitle title={t('title')} />
      <Container>
        <SailingClassesContainer locale={lng} sailingClassesData={response.data} />
      </Container>
    </>
  );
};

export default SailingClassesPage