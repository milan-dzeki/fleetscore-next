'use client';

import type { ClubType, RegattaRegistrationType, RegattaType, SailingNationType } from "@/types/entities";
import IconButton from "../buttons/IconButton";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import classes from '@/styles/components/regattas/regattaRegistrationActions.module.scss';
import { generateRegisterToRegattaForm } from "@/configs/forms/generators/regattas/registerToRegattaForm";
import { useModal } from "@/contexts/modalContext";
import { API_ENDPOINTS } from "@/configs/server/apiEndpoints";
import SERVER_METHODS from "@/configs/server/methods";
import { MODAL_TYPES } from "@/types/contexts/modalContext";
import { useTranslation } from "@/i18n/client";
import { REGATTA_PAGE_NS, REGATTA_REGISTRATIONS_PAGE_NS } from "@/i18n/namespaces/pages";
import { INPUT_TYPES, SelectInputType } from "@/types/inputs";
import { Dispatch } from "react";
import { UseFormAction, UseFormActionTypes } from "@/types/hooks/useForm";

interface Props {
  locale: string;
  registration: RegattaRegistrationType;
  regattaId: number;
  regattaSailingClasses: RegattaType['sailingClasses'];
}

const RegattaRegistrationActions = ({ locale, registration, regattaId, regattaSailingClasses }: Props) => {
  const { t } = useTranslation(locale, [REGATTA_PAGE_NS, REGATTA_REGISTRATIONS_PAGE_NS]);
  
  const { openModal } = useModal();

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

  const onPrepopulateEditForm = async () => {
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
    const registrationForm = generateRegisterToRegattaForm(t);
    const inputs = { ...registrationForm.inputs };
    for (const input in inputs) {
      if (input in registration) {
        const registrationProp = registration[input as keyof typeof registration];
        if (inputs[input].inputType === INPUT_TYPES.TEXT && (typeof registrationProp === 'string' || typeof registrationProp === 'number')) {
          inputs[input].touched = true;
          inputs[input].value = registrationProp.toString();
          inputs[input].valid = true;
        }
      }
    }

    inputs.sailingClubId.value = registration.sailingClubName;
    inputs.sailingClubId.touched = true;
    inputs.sailingClubId.valid = true;

    inputs.sailingClassId.value = registration.sailingClass.name;
    inputs.sailingClassId.touched = true;
    inputs.sailingClassId.valid = true;
    (inputs.sailingClassId as SelectInputType).options = regattaSailingClassesList;
    (inputs.sailingClassId as SelectInputType).searchedOptions = regattaSailingClassesList;
    inputs.sailingNationId.value = registration.sailingNation.country;
    inputs.sailingNationId.touched = true;
    inputs.sailingNationId.valid = true;
    (inputs.sailingNationId as SelectInputType).options = sailingNationsList;
    (inputs.sailingNationId as SelectInputType).searchedOptions = sailingNationsList;

    return {
      inputs,
      isValid: true
    };
  };

  const onOpenEditModal = () => {
    openModal({
      title: 'UPDATE',
      type: MODAL_TYPES.FORM,
      form: generateRegisterToRegattaForm(t),
      formApiConfig: {
        endpoint: `${API_ENDPOINTS.REGATTAS.edit}/${regattaId}/registrations/${registration.id}`,
        method: SERVER_METHODS.PUT
      },
      onPrepopulateForm: onPrepopulateEditForm,
      customSelectHandlers: {
        sailingNationId: onSailingNationSelect
      }
    });
  };
  return (
    <div className={classes.actions}>
      <IconButton
        Icon={<EditIcon />}
        onClick={onOpenEditModal}
        text=""
      />
      <IconButton
        Icon={<DeleteIcon color="errorRed" />}
        onClick={() => {}}
        text=""
      />
    </div>
  );
};

export default RegattaRegistrationActions;