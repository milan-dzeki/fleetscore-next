'use client';

import { useMemo } from 'react';
import type { SailingClassType } from '@/types/entities';
import { SAILING_CLASSES_PAGE_NS } from '@/i18n/namespaces/pages';
import { useTranslation } from '@/i18n/client';
import { useSearchByCheckedInput } from '@/hooks/useSearchByCheckedInput';
import SailingClass from './SailingClass';
import SearchByCheckedInput from '../inputs/SearchByCheckedInput';

interface Props {
  locale: string;
  sailingClassesData: SailingClassType[];
}

const SailingClassesContainer = ({ locale, sailingClassesData }: Props) => {
  const { t } = useTranslation(locale, SAILING_CLASSES_PAGE_NS);

  const searchByInput = useMemo(() => [
    { value: 'name', label: t('name') },
    { value: 'classDesigner', label: t('creator') }
  ], [t]);
  
  const {
    searchByInputState,
    onChangeChecked,
    onSearch,
    onFilterBySearchParams
  } = useSearchByCheckedInput(searchByInput);

  const filteredBySearch = useMemo(() => {
    return onFilterBySearchParams<SailingClassType>(sailingClassesData)
  }, [sailingClassesData, onFilterBySearchParams]);

  return (
    <>
      <div>
        <SearchByCheckedInput
          locale={locale}
          inputsState={searchByInputState}
          onChangeChecked={onChangeChecked}
          onSearch={onSearch}  
        />
      </div>
      <div>
        {filteredBySearch.map((sailingClass) => (
          <SailingClass
            key={sailingClass.id}
            locale={locale}
            sailingClass={sailingClass}
          />
        ))}
      </div>
    </>
  );
};

export default SailingClassesContainer;