import type { PageWithIdParamsType } from '@/types/props/common';
import { getRegattaById } from '@/customApi/regattas/regattasApiClient';
import { getTranslations } from '@/i18n';
import { REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import FormActionMessage from '@/components/forms/FormActionMessage';
import EditButton from '@/components/buttons/EditButton';
import RegattaFull from '@/components/regattas/RegattaFull';

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

  const regatta = response.data;

  return (
    <>
      <PageTitle title={regatta.name} />
      <EditButton itemOwnerId={regatta.ownerId} text={t('editRegatta')} isContainer />
      <RegattaFull regatta={regatta} translations={translations} />
    </>
  );
};

export default SingleRegattaPage;