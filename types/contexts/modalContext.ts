import type { FormType } from '../forms';

export const MODAL_TYPES = {
  CONFIRM: 'confirm',
  FORM: 'form'
} as const;

interface ModalType {
  title: string;
  confirmActionText?: string;
  onConfirm: () => void;
}

interface ModalConfirmType extends ModalType {
  type: typeof MODAL_TYPES.CONFIRM;
  text: string;
}

interface ModalFormType extends ModalType {
  type: typeof MODAL_TYPES.FORM;
  form: FormType
}

export type ModalStateType = ModalConfirmType | ModalFormType; 

export interface ModalContextType {
  modalState: ModalStateType | null;
  openModal: (modal: ModalStateType) => void;
  closeModal: () => void;
}