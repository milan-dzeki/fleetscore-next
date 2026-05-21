'use client';

import type { ClubType, RegattaType, SailingNationType } from '@/types/entities';
import classes from '@/styles/components/regattas/regattaFull.module.scss';
import Button from '../buttons/Button';
import { MODAL_TYPES } from '@/types/contexts/modalContext';
import { useModal } from '@/contexts/modalContext';
import { generateRegisterToRegattaForm } from '@/configs/forms/generators/regattas/registerToRegattaForm';
import { useTranslation } from '@/i18n/client';
import { REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';
import { Dispatch } from 'react';
import { UseFormAction, UseFormActionTypes } from '@/types/hooks/useForm';
import { SelectInputType } from '@/types/inputs';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import { FormType } from '@/types/forms';
import SERVER_METHODS from '@/configs/server/methods';

interface Props {
  locale: string;
  regatta: RegattaType;
  translations: {
    dates: string;
    place: string;
    address: string;
    organisation: string;
    sailingClasses: string;
    email: string;
    phone: string;
    throwoutAfter: string;
    throwoutLimit: string;
    registerForClasses: string;
  };
}

const RegattaFull = ({ locale, regatta, translations }: Props) => {
  const { openModal } = useModal();
  const { t } = useTranslation(locale, REGATTA_PAGE_NS);
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

  const onPrepopulateForm = async (sailingClass: { id: number; name: string }): Promise<FormType | { error: string; }> => {
    const sailingNationsRes = await fetch(API_ENDPOINTS.SAILING_NATIONS.get);

    if (!sailingNationsRes.ok) {
      return { error: 'Failed to get data' };
    }

    const sailingNationsData = await sailingNationsRes.json();
    const sailingNationsList = sailingNationsData.data.map((sn: SailingNationType) => ({
      id: sn.id,
      value: sn.country
    }));

    const regattaSailingClassesList = regatta.sailingClasses.map((sc) => ({ id: sc.id, value: sc.name }));

    const formInputs: FormType['inputs'] = {
      ...registerToRegattaForm.inputs,
      sailingClassId: {
        ...(registerToRegattaForm.inputs.sailingClassId as SelectInputType),
        options: regattaSailingClassesList,
        searchedOptions: regattaSailingClassesList,
        value: sailingClass.name,
        valid: true
      },
      sailingNationId: {
        ...(registerToRegattaForm.inputs.sailingNationId as SelectInputType),
        options: sailingNationsList,
        searchedOptions: sailingNationsList,
      }
    };

    return {
      inputs: formInputs,
      isValid: false
    };
  };

  const onOpenRegisterForm = (sailingClass: { id: number; name: string }): void => {
    openModal({
      type: MODAL_TYPES.FORM,
      title: t('registerToRegatta'),
      form: registerToRegattaForm,
      formApiConfig: {
        endpoint: `${API_ENDPOINTS.REGATTAS.create}/${regatta.id}/registrations`,
        method: SERVER_METHODS.POST
      },
      onPrepopulateForm: () => onPrepopulateForm(sailingClass),
      customSelectHandlers: {
        sailingNationId: onSailingNationSelect
      }
    });
  };
  return (
    <section className={classes.regatta}>
      <div className={classes.regattaContent}>
        <div className={classes.regattaInfo}>
          <span className="text-bold">{translations.dates}: </span>
          <span>{regatta.startDate} - {regatta.endDate}</span>
        </div>
        <div className={classes.regattaInfo}>
          <span className="text-bold">{translations.place}: </span>
          <span>{regatta.country}{regatta.place ? ` / ${regatta.place}` : ''}</span>
        </div>
        <div className={classes.regattaInfo}>
          <span className="text-bold">{translations.address}: </span>
          <span>{regatta.address || '--'}</span>
        </div>
        <div className={classes.regattaInfo}>
          <span className="text-bold">{translations.organisation}: </span>
          <span>{regatta.organisation?.name || '--'}</span>
        </div>
        <div className={classes.regattaInfo}>
          <span className="text-bold">{translations.email}: </span>
          <span>{regatta.email || '--'}</span>
        </div>
        <div className={classes.regattaInfo}>
          <span className="text-bold">{translations.phone}: </span>
          <span>{regatta.phone || ''}</span>
        </div>
        <div className={classes.regattaInfo}>
          <span className="text-bold">{translations.throwoutAfter}: </span>
          <span>{regatta.throwoutAfter ?? '--'}</span>
        </div>
        <div className={classes.regattaInfo}>
          <span className="text-bold">{translations.throwoutLimit}: </span>
          <span>{regatta.throwoutLimit ?? '--'}</span>
        </div>
      </div>
      <div className={classes.regattaRegistration}>
        <span className="text-bold">{translations.registerForClasses}</span>{' '}
        <div>
          {regatta.sailingClasses.map((sc) => (
            <div key={sc.id} className={classes.regattaRegister}>
              <Button
                text={sc.name}
                type="button"
                display="inlineBlock"
                hasBorder={false}
                noHoverChanges
                onClick={() => onOpenRegisterForm(sc)}
              />
              <span className={classes.separator}> / </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegattaFull;