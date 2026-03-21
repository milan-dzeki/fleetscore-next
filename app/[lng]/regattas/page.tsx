import type { LngParamsType } from '@/types/props/common';
import { getRegattas } from '@/customApi/regattas/regattasApiClient';
import { getTranslations } from '@/i18n';
import { REGATTAS_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import NoResults from '@/components/NoResults';
import ROUTE_PATHS from '@/configs/routePaths';

const RegattasPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, REGATTAS_PAGE_NS);
  const response = await getRegattas();

  if (!response.success || !response.data || !Array.isArray(response.data)) {
    return (
      <>
        <PageTitle title={t('title')} />
        <p>{response.message || 'Error fetching regattas'}</p>
      </>
    );
  }

  const createRegattaData = {
    text: t('createRegatta'),
    url: `/${lng}${ROUTE_PATHS.REGATTAS.create}`
  };

  return (
    <>
      <PageTitle title={t('title')} />
      {response.data.length > 0 ? (
        <NoResults text={t('noResults')} createItemData={createRegattaData} />
      ) : (
        <div>dsadas</div>
      )}
    </>
  );
};

export default RegattasPage;