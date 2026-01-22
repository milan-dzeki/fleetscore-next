import { getTranslations } from '@/i18n';

async function TestPage({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await getTranslations(lng, 'test-page')
  return (
    <div>{t('title')}</div>
  )
}

export default TestPage;