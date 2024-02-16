"use client";
import React, { createContext, useState } from "react";
import { StatusModalProps } from "../_components/Modals/StatusModals";
import { ActionModalProps } from "../_components/Modals/ActionModals";
import { UserEditModalProps } from "../_components/Modals/UserEditModal";

interface ModalContextProps {
  toggleModal: (arg0: boolean) => void;
  showModal: boolean;
  modalType: string;
  setModalType: (arg0: string) => void;
  modalProps: StatusModalProps | ActionModalProps | UserEditModalProps | any;
  setModalProps: (arg0: StatusModalProps | ActionModalProps | UserEditModalProps | any) => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalProps, setModalProps] = useState({title:''});

  const toggleModal = (value: boolean) => {
    console.log("TOGGLE", value)
    console.log("TOGGLE", modalType)
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
