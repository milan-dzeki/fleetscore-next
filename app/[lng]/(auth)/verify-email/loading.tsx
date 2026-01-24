import type { LngParamsType } from '@/types/props/common';
import { VERIFY_EMAIL_PAGE_NS } from '@/i18n/namespaces/pages';
import { getTranslations } from '@/i18n';
import Container from '@/components/layout/Container';
import MainLoader from '@/components/loaders/MainLoader';

const Loading = async ({ params: { lng } }: LngParamsType) => {
  const { t } = await getTranslations(lng, VERIFY_EMAIL_PAGE_NS);
  return (
    <Container>
      <MainLoader text={t('verifying')} />
    </Container>
  )
}

export default Loading;