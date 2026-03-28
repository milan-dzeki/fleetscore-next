'use client';

import { type ReactNode, createContext, useContext, useMemo, useState } from 'react';
import type { ModalContextType, ModalStateType } from '@/types/contexts/modalContext';

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalStateType | null>(null);

  const openModal = (modalData: ModalStateType) => setModalState(modalData);
  const closeModal = () => setModalState(null);

  const value = useMemo(() => {
    return {
      modalState,
      openModal,
      closeModal
    };
  }, [modalState]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used inside <ModalProvider>');
  }
  return context;
};

export { ModalProvider, useModal };