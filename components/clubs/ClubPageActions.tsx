'use client';

import { useTranslation } from '@/i18n/client';
import { CLUB_PAGE_NS, CREATE_CLUB_PAGE_NS } from '@/i18n/namespaces/pages';
import { useModal } from '@/contexts/modalContext';
import ActionsContainer from '../buttons/ActionsContainer';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { MODAL_TYPES } from '@/types/contexts/modalContext';
import { ClubType, OrganisationType } from '@/types/entities';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import { FormType } from '@/types/forms';
import { INPUT_TYPES, SelectInputType } from '@/types/inputs';
import { generateCreateRegattaForm } from '@/configs/forms/generators/regattas/createRegattaForm';
import SERVER_METHODS from '@/configs/server/methods';
import { generateCreateClubForm } from '@/configs/forms/generators/clubs/createClubForm';

interface Props {
  locale: string;
  club: ClubType;
}

const ClubPageActions = ({ locale, club }: Props) => {
  const { t } = useTranslation(locale, [CREATE_CLUB_PAGE_NS, CLUB_PAGE_NS]);

  const { openModal } = useModal();

  const onDeleteClub = async () => {
    return await fetch(`${API_ENDPOINTS.CLUBS.delete}/${club.id}`, {
      method: SERVER_METHODS.DELETE
    });
  };

  const onOpenDeleteModal = () => {
    openModal({
      type: MODAL_TYPES.CONFIRM,
      title: t(`${CLUB_PAGE_NS}:deletingClub`),
      text: t(`${CLUB_PAGE_NS}:deleteText`),
      confirmActionText: t(`${CLUB_PAGE_NS}:deleteClub`),
      onConfirm: onDeleteClub
    });
  };

  const onPrepopulateForm = async (): Promise<FormType | { error: string }> => {
    try {
      const organisations = await fetch(`${API_ENDPOINTS.ORGANISATIONS.get}`)
      
      if (!organisations.ok) {
        return {
          error: t('getFormDataError')
        };
      }
      const organisationsData = await organisations.json();
      const createClubForm = generateCreateClubForm(t);

      const clubFormInputs = { ...createClubForm.inputs };
      for (const input in clubFormInputs) {
        if (input in club) {
          const clubProp = club[input as keyof typeof club];

          if (clubFormInputs[input].inputType === INPUT_TYPES.TEXT && (typeof clubProp === 'string' || typeof clubProp === 'number')) {
            clubFormInputs[input].touched = true;
            clubFormInputs[input].value = clubProp.toString();
            clubFormInputs[input].valid = true;
          }
        }
      }

      const organisationsForList = organisationsData.data.map((org: OrganisationType) => ({
        id: org.id,
        value: org.name
      }));

      if (!!club.organisationId) {
        clubFormInputs.organisationId.value = club.organisationName;
        clubFormInputs.organisationId.valid = true;
      }

      (clubFormInputs.organisationId as SelectInputType).options = organisationsForList;
      (clubFormInputs.organisationId as SelectInputType).searchedOptions = organisationsForList;

      return {
        inputs: clubFormInputs,
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
        endpoint: `${API_ENDPOINTS.CLUBS.edit}/${club.id}`,
        method: SERVER_METHODS.PUT
      },
      onPrepopulateForm
    });
  };

  const buttons = [
    {
      text: t(`${CLUB_PAGE_NS}:editClub`),
      Icon: <EditIcon />,
      action: onOpenEditModal
    },
    {
      text: t(`${CLUB_PAGE_NS}:deleteClub`),
      Icon: <DeleteIcon color="errorRed" />,
      action: onOpenDeleteModal,
      danger: true
    }
  ];

  return <ActionsContainer itemOwnerId={club.ownerId} buttons={buttons} />
};

export default ClubPageActions;