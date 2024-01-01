"use client";
import React, { useContext } from "react";
import { ModalContext } from "../providers/ModalProvider";
import { FilterModal } from ".";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const { showModal, toggleModal } = modalContextValue;
  return (
    <>
      <div
        className="h-screen flex-1 overflow-auto px-8 pb-8"
        onClick={() => toggleModal(false)}
      >
        {children}
      </div>
      {showModal && <FilterModal />}
    </>
  );
};

export default MainContent;
