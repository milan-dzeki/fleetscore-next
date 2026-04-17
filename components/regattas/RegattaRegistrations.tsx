'use client';

import type { SelectInputType } from '@/types/inputs';
import type { ClubType, RegattaType, SailingNationType } from '@/types/entities';
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
import { Dispatch } from 'react';
import { UseFormAction, UseFormActionTypes } from '@/types/hooks/useForm';
import ROUTE_PATHS from '@/configs/routePaths';

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
  const registerToRegattaForm = generateRegisterToRegattaForm(t);

  const onSailingNationSelect = async ({
    dispatch,
    input,
    value
  }: {
    dispatch: Dispatch<UseFormAction>;
    input: SelectInputType;
    value: string;
  }) => {
    const valueId = input.options.find((option) => option.value.toLowerCase() === value.toLowerCase())?.id;
    if (!valueId) {
      return;
    }

    const clubs = await fetch(`${API_ENDPOINTS.CLUBS.get}?sailingNationId=${valueId}`);

    if (!clubs.ok) {
      return;
    }
    const clubsData = await clubs.json();

    const clubsForList = clubsData.data.map((club: ClubType) => ({
      id: club.id,
      value: `${club.name} (${club.sailingNationCountry})`
    }));

    dispatch({
      type: UseFormActionTypes.ON_POPULATE_SELECT_DATA,
      inputName: 'sailingClubId',
      selectOptions: clubsForList
    });
  };

  const onPrepopulateForm = async (): Promise<FormType | { error: string; }> => {
    const sailingNationsRes = await fetch(API_ENDPOINTS.SAILING_NATIONS.get);

    if (!sailingNationsRes.ok) {
      return { error: 'Failed to get data' };
    }

    const sailingNationsData = await sailingNationsRes.json();
    const sailingNationsList = sailingNationsData.data.map((sn: SailingNationType) => ({
      id: sn.id,
      value: sn.country
    }));

    const regattaSailingClassesList = regattaSailingClasses.map((sc) => ({ id: sc.id, value: sc.name }));

    const formInputs: FormType['inputs'] = {
      ...registerToRegattaForm.inputs,
      sailingClassId: {
        ...(registerToRegattaForm.inputs.sailingClassId as SelectInputType),
        options: regattaSailingClassesList,
        searchedOptions: regattaSailingClassesList
      },
      sailingNationId: {
        ...(registerToRegattaForm.inputs.sailingNationId as SelectInputType),
        options: sailingNationsList,
        searchedOptions: sailingNationsList
      }
    };

    return {
      inputs: formInputs,
      isValid: false
    };
  };

  const onOpenRegisterForm = (): void => {
    openModal({
      type: MODAL_TYPES.FORM,
      title: t('registerToRegatta'),
      form: registerToRegattaForm,
      formApiConfig: {
        endpoint: `${API_ENDPOINTS.REGATTAS.create}/${regattaId}/registrations`,
        method: SERVER_METHODS.POST
      },
      onPrepopulateForm,
      customSelectHandlers: {
        sailingNationId: onSailingNationSelect
      }
    });
  };
  return (
    <section className={classes.registrations}>
      <IconButton text={translations.register} Icon={<PlusCircleIcon />} onClick={onOpenRegisterForm} />
      <RegularLink
        href={`/${locale}${ROUTE_PATHS.REGATTAS.root}/${regattaId}/registrations`}
        text={translations.seeRegistrations}
        IconRight={<ArrowLinkRightIcon color="mainBlue" />}
      />
    </section>
  );
};

export default RegattaRegistrations;