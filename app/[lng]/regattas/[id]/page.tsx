import type { PageWithIdParamsType } from '@/types/props/common';
import { getRegattaById } from '@/customApi/regattas/regattasApiClient';
import { getTranslations } from '@/i18n';
import { REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import FormActionMessage from '@/components/forms/FormActionMessage';
import RegattaFull from '@/components/regattas/RegattaFull';
import RegattaPageActions from '@/components/regattas/RegattaPageActions';
import RegattaRegistrations from '@/components/regattas/RegattaRegistrations';

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

  const translations = {
    dates: t('dates'),
    place: t('place'),
    address: t('address'),
    organisation: t('organisation'),
    sailingClasses: t('sailingClasses'),
    email: t('email'),
    phone: t('phone'),
    throwoutAfter: t('throwoutAfter'),
    throwoutLimit: t('throwoutLimit'),
  };

  const registrationsTranslations = {
    seeRegistrations: t('seeRegistrations'),
    register: t('register')
  };

  const regatta = response.data;

  return (
    <>
      <PageTitle title={regatta.name} />
      <RegattaPageActions locale={lng} regattaOwnerId={regatta.ownerId} regatta={regatta} />
      <RegattaFull regatta={regatta} translations={translations} />
      <RegattaRegistrations translations={registrationsTranslations} />
    </>
  );
};

export default SingleRegattaPage;