'use client';

import { useModal } from '@/contexts/modalContext';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/i18n/client';
import { MODAL_TYPES } from '@/types/contexts/modalContext';
import { SHARED_NS } from '@/i18n/namespaces/components';
import Backdrop from './Backdrop';
import XFatIcon from '../icons/XFatIcon';
import Button from '../buttons/Button';
import classes from '@/styles/components/modals/modal.module.scss';

interface Props {
  locale: string;
}

const Modal = ({ locale }: Props) => {
  const { t } = useTranslation(locale, SHARED_NS);
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const { modalState, closeModal } = useModal();

  useEffect(() => {
    setElement(document.getElementById('modal'));
    setMounted(true);
  }, []);

  if (!mounted || !element || !modalState) return null;

  return createPortal(
    <>
      <Backdrop show={!!modalState} />
      <div className={`${classes.modal}`}>
        <div className={classes.modalHeader}>
          <h4>{modalState.title}</h4>
          <XFatIcon onClick={closeModal} />
        </div>
        <div className={classes.modalContent}>
          {modalState.type === MODAL_TYPES.CONFIRM ? (
            <p>{modalState.text || ''}</p>
          ) : (
            <p>FORM</p>
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
          <Button
            type="button"
            text={modalState.confirmActionText || t('confirm')}
            display="inlineBlock"
            danger
            hasBorder={false}
            onClick={modalState.onConfirm}
          />
        </div>
      </div>
    </>,
    element
  );
};

export default Modal;