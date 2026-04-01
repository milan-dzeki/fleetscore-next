'use client';

import { useTranslation } from '@/i18n/client';
import { CREATE_REGATTA_PAGE_NS, REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';
import { useModal } from '@/contexts/modalContext';
import ActionsContainer from '../buttons/ActionsContainer';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { MODAL_TYPES } from '@/types/contexts/modalContext';
import { OrganisationType, RegattaType, SailingClassType } from '@/types/entities';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import { FormType } from '@/types/forms';
import { INPUT_TYPES, SelectCheckboxesInputType, SelectInputType } from '@/types/inputs';
import { generateCreateRegattaForm } from '@/configs/forms/generators/regattas/createRegattaForm';
import SERVER_METHODS from '@/configs/server/methods';

interface Props {
  locale: string;
  regattaOwnerId: string | number;
  regatta: RegattaType;
}

const RegattaPageActions = ({ locale, regattaOwnerId, regatta }: Props) => {
  const { t } = useTranslation(locale, [CREATE_REGATTA_PAGE_NS, REGATTA_PAGE_NS]);

  const { openModal } = useModal();

  const onDeleteRegatta = async () => {
    return await fetch(`${API_ENDPOINTS.REGATTAS.delete}/${regatta.id}`, {
      method: SERVER_METHODS.DELETE
    });
  };

  const onOpenDeleteModal = () => {
    openModal({
      type: MODAL_TYPES.CONFIRM,
      title: t(`${REGATTA_PAGE_NS}:deletingRegatta`),
      text: t(`${REGATTA_PAGE_NS}:deleteText`),
      confirmActionText: t(`${REGATTA_PAGE_NS}:deleteRegatta`),
      onConfirm: onDeleteRegatta
    });
  };

  const onPrepopulateForm = async (): Promise<FormType | { error: string }> => {
    try {
      const [organisations, sailingClasses] = await Promise.all([
        fetch(`${API_ENDPOINTS.ORGANISATIONS.get}`),
        fetch(`${API_ENDPOINTS.SAILING_CLASSES.get}`)
      ]);
      
      if (!organisations.ok || !sailingClasses.ok) {
        return {
          error: t('getFormDataError')
        };
      }
      const organisationsData = await organisations.json();
      const sailingClassesData = await sailingClasses.json();
      const createRegattaForm = generateCreateRegattaForm(t);

      const regattaFormInputs = { ...createRegattaForm.inputs };
      for (const input in regattaFormInputs) {
        if (input in regatta) {
          const regattaProp = regatta[input as keyof typeof regatta];

          if (regattaFormInputs[input].inputType === INPUT_TYPES.TEXT && (typeof regattaProp === 'string' || typeof regattaProp === 'number')) {
            regattaFormInputs[input].touched = true;
            regattaFormInputs[input].value = regattaProp.toString();
            regattaFormInputs[input].valid = true;
          }
        }
      }

      const organisationsForList = organisationsData.data.map((org: OrganisationType) => ({
        id: org.id,
        value: org.name
      }));
      const sailingClassesList = sailingClassesData.data.map((sc: SailingClassType) => ({
        id: sc.id,
        value: sc.name,
        checked: regatta.sailingClasses.find((sailCl) => sailCl.id === sc.id) !== undefined
      }));

      if (regatta.sailingClasses.length > 0) {
        regattaFormInputs.sailingClassIds.value = `${regatta.sailingClasses[0].name} ${regatta.sailingClasses.length > 1 ? ` + ${regatta.sailingClasses.length - 1}` : ''}`;
        regattaFormInputs.sailingClassIds.valid = true;
      }

      (regattaFormInputs.sailingClassIds as SelectCheckboxesInputType).options = sailingClassesList;
      (regattaFormInputs.sailingClassIds as SelectCheckboxesInputType).searchedOptions = sailingClassesList;

      if (regatta.organisation?.id) {
        regattaFormInputs.organisationId.value = regatta.organisation.name;
        regattaFormInputs.organisationId.valid = true;
      }

      (regattaFormInputs.organisationId as SelectInputType).options = organisationsForList;
      (regattaFormInputs.organisationId as SelectInputType).searchedOptions = organisationsForList;

      return {
        inputs: regattaFormInputs,
        isValid: true
      };
    } catch {
      return { error: t('getFormDataError') };
    }
  };

  const onOpenEditModal = () => {
    openModal({
      title: 'UPDATE',
      type: MODAL_TYPES.FORM,
      form: generateCreateRegattaForm(t),
      formApiConfig: {
        endpoint: `${API_ENDPOINTS.REGATTAS.edit}/${regatta.id}`,
        method: SERVER_METHODS.PUT
      },
      onPrepopulateForm
    });
  };

  const buttons = [
    {
      text: t(`${REGATTA_PAGE_NS}:editRegatta`),
      Icon: <EditIcon />,
      action: onOpenEditModal
    },
    {
      text: t(`${REGATTA_PAGE_NS}:deleteRegatta`),
      Icon: <DeleteIcon color="errorRed" />,
      action: onOpenDeleteModal,
      danger: true
    }
  ];

  return <ActionsContainer itemOwnerId={regattaOwnerId} buttons={buttons} />
};

export default RegattaPageActions;