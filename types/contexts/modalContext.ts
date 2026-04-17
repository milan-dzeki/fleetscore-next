import { Dispatch } from 'react';
import type { FormApiConfigType } from '../commons';
import type { FormType } from '../forms';
import type { SelectInputType } from '../inputs';
import { UseFormAction } from '../hooks/useForm';

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
  onConfirm: () => Promise<Response>;
}

interface ModalFormType extends ModalType {
  type: typeof MODAL_TYPES.FORM;
  form: FormType;
  formApiConfig: FormApiConfigType;
  onPrepopulateForm?: () => Promise<FormType | { error: string; }> | FormType;
  customSelectHandlers?: {
    [inputName: string]: (params: {
      dispatch: Dispatch<UseFormAction>;
      input: SelectInputType;
      value: string;
    }) => Promise<void>
  }
}

export type ModalStateType = ModalConfirmType | ModalFormType; 

export interface ModalContextType {
  modalState: ModalStateType | null;
  openModal: (modal: ModalStateType) => void;
  closeModal: () => void;
}