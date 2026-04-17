import FormActionMessage from '@/components/forms/FormActionMessage';
import Container from '@/components/layout/Container';
import PageTitle from '@/components/layout/PageTitle';
import RegattaRegistrationsTable from '@/components/regattas/RegattaRegistrationsTable';
import { getRegattaById, getRegattaRegistrations } from '@/customApi/regattas/regattasApiClient';
import { getTranslations } from '@/i18n';
import { REGATTA_REGISTRATIONS_PAGE_NS } from '@/i18n/namespaces/pages';
import type { PageWithIdParamsType } from '@/types/props/common';


const RegattaRegistrationsPage = async ({
  params: {
    lng,
    id
  }
}: PageWithIdParamsType) => {
  const { t } = await getTranslations(lng, REGATTA_REGISTRATIONS_PAGE_NS)
  const [regatta, registrations] = await Promise.all([
    getRegattaById(id),
    getRegattaRegistrations(id)
  ]);

  if(!regatta.success || !registrations.success) {
    return (
      <>
        <PageTitle title={'error'} />
        <FormActionMessage isError message={!regatta.success ? regatta.message : registrations.message} />
      </>
    );
  }

  const tableTranslations = {
    header: {
      name: t('name'),
      birthday: t('birthday'),
      sailNumber: t('sailNumber'),
      gender: t('gender'),
      club: t('club'),
      sailingClass: t('sailingClass'),
      nation: t('nation'),
    }
  };

  return (
    <>
      <PageTitle title={t('title', { regattaName: regatta.data.name })} />
      <Container>
        {
          registrations.data.length === 0
            ? <p>{t('noRegistrations')}</p>
            : <RegattaRegistrationsTable
                locale={lng}
                regattaId={regatta.data.id}
                regattaSailingClasses={regatta.data.sailingClasses}
                registrations={registrations.data}
                translations={tableTranslations}
              />
        }
      </Container>
    </>
  );
};

export default RegattaRegistrationsPage;