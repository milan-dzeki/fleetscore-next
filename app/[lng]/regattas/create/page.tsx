import React from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { getTranslations } from '@/i18n';
import type { LngParamsType } from '@/types/props/common';
import { getProfile } from '@/customApi/auth/authUtils';
import ROUTE_PATHS from '@/configs/routePaths';
import PageTitle from '@/components/layout/PageTitle';
import { CREATE_REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';

const CreateRegataPage = async ({ params: { lng } }: LngParamsType) => {
  const profileResponse = await getProfile();
  if (!profileResponse.success) {
    redirect(`/${lng}${ROUTE_PATHS.AUTH.login}`, RedirectType.replace);
  }

  const { t } = await getTranslations(lng, CREATE_REGATTA_PAGE_NS);

  return (
    <>
      <PageTitle title={t('title')} />
    </>
  );
};

export default CreateRegataPage