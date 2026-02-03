import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { ORGANISATIONS_PAGE_NS } from '@/i18n/namespaces/pages';
import { getOrganisations } from '@/customApi/organisations/organisationsApiClient';
import PageTitle from '@/components/layout/PageTitle';
import Organisation from '@/components/organisations/Organisation';
import Container from '@/components/layout/Container';

const OrganisationsPage = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, ORGANISATIONS_PAGE_NS);
  
  const response = await getOrganisations();

  if (!response.success || !response.data || !Array.isArray(response.data)) {
    return (
      <>
        <PageTitle title={t('title')} />
        <p>{response.message || 'Error fetching organisations'}</p>
      </>
    );
  }

  const translations = {
    visit: t('visit'),
    location: t('location'),
    email: t('email'),
    phone: t('phone'),
    unspecified: t('unspecified'),
    ownerFlag: t('ownerFlag')
  };

  return (
    <>
      <PageTitle title={t('title')} />
      {response.data.length === 0 ? (
        <p>{t('noResults')}</p>
      ) : (
        <Container>
          <ul>
            {response.data.map((organisation) => (
              <Organisation
                key={organisation.id}
                organisation={organisation}
                translations={translations}  
              />
            ))}
          </ul>
        </Container>
      )}
    </>
  );
};

export default OrganisationsPage;