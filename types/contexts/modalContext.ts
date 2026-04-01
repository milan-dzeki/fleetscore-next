import type { FormApiConfigType } from '../commons';
import type { FormType } from '../forms';

export const MODAL_TYPES = {
  CONFIRM: 'confirm',
  FORM: 'form'
} as const;

interface ModalType {
  title: string;
  confirmActionText?: string;
}

interface ModalConfirmType extends ModalType {
  type: typeof MODAL_TYPES.CONFIRM;
  text: string;
  onConfirm: () => void;
}

interface ModalFormType extends ModalType {
  type: typeof MODAL_TYPES.FORM;
  form: FormType;
  formApiConfig: FormApiConfigType;
  onPrepopulateForm?: () => Promise<FormType | { error: string; }> | FormType;
}

export type ModalStateType = ModalConfirmType | ModalFormType; 

export interface ModalContextType {
  modalState: ModalStateType | null;
  openModal: (modal: ModalStateType) => void;
  closeModal: () => void;
}