'use client';

import type { SelectInputType } from '@/types/inputs';
import type { RegattaType } from '@/types/entities';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import { REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';
import SERVER_METHODS from '@/configs/server/methods';
import { MODAL_TYPES } from '@/types/contexts/modalContext';
import { useModal } from '@/contexts/modalContext';
import { useTranslation } from '@/i18n/client';
import { generateRegisterToRegattaForm } from '@/configs/forms/generators/regattas/registerToRegattaForm';
import RegularLink from '../links/RegularLink';
import ArrowLinkRightIcon from '../icons/ArrowLinkRightIcon';
import IconButton from '../buttons/IconButton';
import PlusCircleIcon from '../icons/PlusCircleIcon';
import classes from '@/styles/components/regattas/regattaRegistrations.module.scss';
import { FormType } from '@/types/forms';

interface Props {
  locale: string;
  regattaId: number;
  regattaSailingClasses: RegattaType['sailingClasses'];
  translations: {
    seeRegistrations: string;
    register: string;
  };
}

const RegattaRegistrations = ({
  locale,
  regattaId,
  regattaSailingClasses,
  translations
}: Props) => {
  const { t } = useTranslation(locale, REGATTA_PAGE_NS);
  const { openModal } = useModal();

  const onOpenRegisterForm = (): void => {
    const registerToRegattaForm = generateRegisterToRegattaForm(t);

    const regattaSailingClassesList = regattaSailingClasses.map((sc) => ({ id: sc.id, value: sc.name }));

    const formInputs: FormType['inputs'] = {
      ...registerToRegattaForm.inputs,
      sailingClassId: {
        ...(registerToRegattaForm.inputs.sailingClassId as SelectInputType),
        options: regattaSailingClassesList,
        searchedOptions: regattaSailingClassesList
      }
    };

    openModal({
      type: MODAL_TYPES.FORM,
      title: t('registerToRegatta'),
      form: {
        inputs: formInputs,
        isValid: false
      },
      formApiConfig: {
        endpoint: `${API_ENDPOINTS.REGATTAS.create}/${regattaId}/registrations`,
        method: SERVER_METHODS.POST
      }
    });
  };
  return (
    <section className={classes.registrations}>
      <IconButton text={translations.register} Icon={<PlusCircleIcon />} onClick={onOpenRegisterForm} />
      <RegularLink
        href='/'
        text={translations.seeRegistrations}
        IconRight={<ArrowLinkRightIcon color="mainBlue" />}
      />
    </section>
  );
};

export default RegattaRegistrations;