import Link from 'next/link';
import type { LngParamsType } from '@/types/props/common';
import { getTranslations } from '@/i18n';
import { ORGANISATIONS_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import { getOrganisations } from '@/customApi/organisations/organisationsApiClient';

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

  return (
    <>
      <PageTitle title={t('title')} />
      {response.data.length === 0 ? (
        <p>No organisations found</p>
      ) : (
        <ul>
          {response.data.map((org) => (
            <li key={org.id}>
              <Link href={`/${lng}/organisations/${org.id}`}>
                {org.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default OrganisationsPage;