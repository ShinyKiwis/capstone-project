"use client";
import React, { createContext, useState } from "react";

interface ModalContextProps {
  toggleModal: (arg0: boolean) => void;
  showModal: boolean;
  modalType: string;
  setModalType: (arg0: string) => void;
  modalProps: any   // could be any object suitable for each modal type and its subtypes
  setModalProps: (arg0: object) => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalProps, setModalProps] = useState({});

  const toggleModal = (value: boolean) => {
    setShowModal(value);
  };
  const modalContextValue: ModalContextProps = {
    toggleModal,
    showModal,
    modalType,
    setModalType,
    modalProps,
    setModalProps
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
