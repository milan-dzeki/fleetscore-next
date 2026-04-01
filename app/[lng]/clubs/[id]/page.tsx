import type { PageWithIdParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { CLUB_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import FormActionMessage from '@/components/forms/FormActionMessage';
import { getClubById } from '@/customApi/clubs/clubsApiClient';
import ClubFull from '@/components/clubs/ClubFull';
import ClubPageActions from '@/components/clubs/ClubPageActions';

const SingleClubPage = async ({
  params: {
    lng,
    id
  }
}: PageWithIdParamsType) => {
  const { t } = await getTranslations(lng, CLUB_PAGE_NS);
  const response = await getClubById(id);

  if (!response.success) {
    return (
      <>
        <PageTitle title={t('title')} />
        <FormActionMessage isError message={response.message} />
      </>
    );
  }

  const translations = {
    place: t('place'),
    address: t('address'),
    organisation: t('organisation'),
    email: t('email'),
    phone: t('phone')
  };

  const club = response.data;

  return (
    <>
      <PageTitle title={club.name} />
      <ClubPageActions club={club} locale={lng} />
      <ClubFull club={club} translations={translations} />
    </>
  );
};

export default SingleClubPage;