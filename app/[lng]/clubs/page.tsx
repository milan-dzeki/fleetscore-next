import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { CLUBS_PAGE_NS } from '@/i18n/namespaces/pages';
import { getClubs } from '@/customApi/clubs/clubsApiClient';
import PageTitle from '@/components/layout/PageTitle';
import NoResults from '@/components/NoResults';
import ROUTE_PATHS from '@/configs/routePaths';
import Container from '@/components/layout/Container';
import Club from '@/components/clubs/Club';

const ClubsPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, CLUBS_PAGE_NS);

  const response = await getClubs();

  if (!response.success || !response.data || !Array.isArray(response.data)) {
    return (
      <>
        <PageTitle title={t('title')} />
        <p>{response.message || 'Error fetching regattas'}</p>
      </>
    );
  }

  const createClubData = {
    text: t('createClub'),
    url: `/${lng}${ROUTE_PATHS.CLUBS.create}`
  };

  const translations = {
    place: t('place'),
    organisation: t('organisation'),
    edit: t('edit'),
    seeDetails: t('seeDetails')
  };

  return (
    <>
      <PageTitle title={t('title')} />
      {response.data.length === 0 ? (
        <NoResults text={t('noResults')} createItemData={createClubData} />
      ) : (
        <Container>
          {response.data.map((club) => (
            <Club
              key={club.id.toString()}
              locale={lng}
              club={club}
              translations={translations}
            />
          ))}
        </Container>
      )}
    </>
  );
};

export default ClubsPage;