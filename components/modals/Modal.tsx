'use client';

import { useState, useEffect, useRef } from 'react';
import { useModal } from '@/contexts/modalContext';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/i18n/client';
import { MODAL_TYPES } from '@/types/contexts/modalContext';
import { SHARED_NS } from '@/i18n/namespaces/components';
import Backdrop from './Backdrop';
import XFatIcon from '../icons/XFatIcon';
import Button from '../buttons/Button';
import classes from '@/styles/components/modals/modal.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Form from '../forms/Form';

interface Props {
  locale: string;
}

const Modal = ({ locale }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation(locale, SHARED_NS);
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const { modalState, closeModal } = useModal();
  
  useOutsideClick(modalRef, closeModal);

  useEffect(() => {
    setElement(document.getElementById('modal'));
    setMounted(true);
  }, []);

  if (!mounted || !element || !modalState) return null;

  return createPortal(
    <>
      <Backdrop show={!!modalState} />
      <div className={`${classes.modal} ${modalState.type === MODAL_TYPES.FORM ? classes.modalForm : ''}`} ref={modalRef}>
        <div className={classes.modalHeader}>
          <h4>{modalState.title}</h4>
          <XFatIcon onClick={closeModal} />
        </div>
        <div className={classes.modalContent}>
          {modalState.type === MODAL_TYPES.CONFIRM ? (
            <p>{modalState.text || ''}</p>
          ) : (
            <div className={classes.modalContentForm}>
              <Form
                generatedForm={modalState.form}
                apiConfig={modalState.formApiConfig}
                onPrepopulateForm={modalState.onPrepopulateForm}
                submitText={modalState.confirmActionText || 'ok'}
                shouldRefreshOnSuccess
                createNotificationOnSuccess
                closeModalOnSettled
              />
            </div>
          )}
        </div>
        <div className={classes.modalActions}>
          <Button
            type="button"
            text={t('cancel')}
            display="inlineBlock"
            hasBorder={false}
            onClick={closeModal}
          />
          {modalState.type === MODAL_TYPES.CONFIRM && (
            <Button
              type="button"
              text={modalState.confirmActionText || t('confirm')}
              display="inlineBlock"
              danger
              hasBorder={false}
              onClick={modalState.onConfirm}
            />
          )}
        </div>
      </div>
    </>,
    element
  );
};

export default Modal;