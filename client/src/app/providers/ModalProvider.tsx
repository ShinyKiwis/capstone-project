"use client";
import React, { createContext, useState } from "react";
import { StatusModalProps } from "../_components/Modals/StatusModals";
import { ActionModalProps } from "../_components/Modals/ActionModals";

interface ModalContextProps {
  toggleModal: (arg0: boolean) => void;
  showModal: boolean;
  modalType: string;
  setModalType: (arg0: string) => void;
  modalProps: StatusModalProps | ActionModalProps
  setModalProps: (arg0: StatusModalProps | ActionModalProps) => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalProps, setModalProps] = useState({title:''});

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
