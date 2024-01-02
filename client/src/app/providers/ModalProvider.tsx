"use client";
import React, { createContext, useState } from "react";

interface ModalContextProps {
  toggleModal: (arg0: boolean) => void;
  showModal: boolean;
  modalType: string;
  setModalType: (arg0: string) => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const toggleModal = (value: boolean) => {
    setShowModal(value);
  };
  const modalContextValue: ModalContextProps = {
    toggleModal,
    showModal,
    modalType,
    setModalType
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
