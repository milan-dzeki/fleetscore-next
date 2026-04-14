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
import { useRouter } from 'next/navigation';
import ModalConfirmContent from './ModalConfirmContent';
import { useDispatch } from 'react-redux';
import { setNotifications } from '@/store/slices/notificationsSlice';

interface Props {
  locale: string;
}

const Modal = ({ locale }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation(locale, SHARED_NS);
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const { modalState, closeModal } = useModal();

  const fullModalClose = () => {
    setLoading(false);
    setError(null);
    closeModal();
  };
  
  useOutsideClick(modalRef, fullModalClose, modalState !== null);

  useEffect(() => {
    setElement(document.getElementById('modal'));
    setMounted(true);
  }, []);

  if (!mounted || !element || !modalState) return null;

  const handleConfirm = async () => {
    if (modalState.type !== MODAL_TYPES.CONFIRM) {
      return;
    }

    setLoading(true);

    try {
      const response = await modalState.onConfirm();
      if (!response.ok) {
        setError(response.statusText || 'Network error');
        return;
      }

      const resData = await response.json();

      if (resData.redirectUrl) {
        router.refresh();
        router.replace(resData.redirectUrl);
      }

      if (resData.message) {
        dispatch(setNotifications({
          notifications: [
            { id: '1', text: resData.message, type: 'success', isDisappearing: true }
          ]
        }));
      }
      fullModalClose();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <>
      <Backdrop show={!!modalState} />
      <div className={`${classes.modal} ${modalState.type === MODAL_TYPES.FORM ? classes.modalForm : ''}`} ref={modalRef}>
        <div className={classes.modalHeader}>
          <h4>{modalState.title}</h4>
          <XFatIcon onClick={fullModalClose} />
        </div>
        <div className={classes.modalContent}>
          {modalState.type === MODAL_TYPES.CONFIRM
            ? <ModalConfirmContent loading={loading} errorMsg={error} text={modalState.text} />
            : (
              <div className={classes.modalContentForm}>
                <Form
                  generatedForm={modalState.form}
                  apiConfig={modalState.formApiConfig}
                  onPrepopulateForm={modalState.onPrepopulateForm}
                  submitText={modalState.confirmActionText || 'ok'}
                  shouldRefreshOnSuccess
                  createNotificationOnSuccess
                  closeModalOnSettled
                  customSelectHandlers={modalState.customSelectHandlers || null}
                />
              </div>
            )
          }
        </div>
        <div className={classes.modalActions}>
          <Button
            type="button"
            text={t('cancel')}
            display="inlineBlock"
            hasBorder={false}
            onClick={fullModalClose}
          />
          {modalState.type === MODAL_TYPES.CONFIRM && (
            <Button
              type="button"
              text={modalState.confirmActionText || t('confirm')}
              display="inlineBlock"
              danger
              hasBorder={false}
              onClick={handleConfirm}
              disabled={loading || !!error}
            />
          )}
        </div>
      </div>
    </>,
    element
  );
};

export default Modal;