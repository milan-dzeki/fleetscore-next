'use client';

import { useTranslation } from '@/i18n/client';
import { REGATTA_PAGE_NS } from '@/i18n/namespaces/pages';
import { useModal } from '@/contexts/modalContext';
import ActionsContainer from '../buttons/ActionsContainer';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { MODAL_TYPES } from '@/types/contexts/modalContext';

interface Props {
  locale: string;
  regattaOwnerId: string | number;
}

const RegattaPageActions = ({ locale, regattaOwnerId }: Props) => {
  const { t } = useTranslation(locale, REGATTA_PAGE_NS);

  const { openModal } = useModal();

  const onOpenDeleteModal = () => {
    openModal({
      type: MODAL_TYPES.CONFIRM,
      title: t('deletingRegatta'),
      text: t('deleteText'),
      confirmActionText: t('deleteRegatta'),
      onConfirm: () => {}
    });
  };

  const buttons = [
    {
      text: t('editRegatta'),
      Icon: <EditIcon />,
      action: () => {}
    },
    {
      text: t('deleteRegatta'),
      Icon: <DeleteIcon color="errorRed" />,
      action: onOpenDeleteModal,
      danger: true
    }
  ];

  return <ActionsContainer itemOwnerId={regattaOwnerId} buttons={buttons} />
};

export default RegattaPageActions;