import type { LngParamsType } from '@/types/props/common';
import { getRegattas } from '@/customApi/regattas/regattasApiClient';
import { getTranslations } from '@/i18n';
import { REGATTAS_PAGE_NS } from '@/i18n/namespaces/pages';
import PageTitle from '@/components/layout/PageTitle';
import Link from 'next/link';

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

  return (
    <>
      <PageTitle title={t('title')} />
      <ul>
        {response.data.map((regatta) => (
          <li key={regatta.id.toString()}>
            <Link href={`/${lng}/regattas/${regatta.id}`}>{regatta.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RegattasPage;