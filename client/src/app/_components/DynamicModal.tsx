import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { ModalContext } from "../providers/ModalProvider";
import FilterModal from "./Modals/FilterModal";
import {
  StatusModalProps,
  SuccessModal,
  WarningModal,
} from "./Modals/StatusModals";
import {
  ActionModalProps,
  RemovalModal,
  ProjDenyModal,
} from "./Modals/ActionModals";
import UnenrollModal from "./Modals/UnenrollModal";
import UploadFileModal from "./Modals/UploadFileModal";
import axios from "axios";
import DeleteProjectModal from "./Modals/DeleteProjectModal";

type definedModalProps = StatusModalProps | ActionModalProps;

const DynamicModal = () => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const { toggleModal, modalType, modalProps } = modalContextValue;

  const renderModal = (modalType: string, modalProps: definedModalProps) => {
    console.log("MODAL", modalType);
    switch (modalType) {
      case "filter":
        return <FilterModal />;
      case "status_success":
        return <SuccessModal title="Enrolled successfully !" />;
      case "status_warning":
        return (
          <WarningModal
            title={modalProps?.title}
            messages={modalProps?.messages}
          />
        );
      case "project_unenrollment":
        return <UnenrollModal />;
      case "project_deletion":
        return <DeleteProjectModal projectId={modalProps.title} />;
      case "project_denial":
        return <ProjDenyModal />;
      case "upload":
        return <UploadFileModal />;
      default:
        return "Invalid modal type";
    }
  };
  return (
    <div
      className="fixed inset-x-0 inset-y-1/2 m-auto h-fit min-h-40 w-fit min-w-64 rounded-md border-2 border-lightgray bg-white px-10 py-6"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="relative">
        <div className="absolute right-0">
          <CgClose
            size={30}
            className="cursor-pointer text-lightgray hover:text-black"
            onClick={() => toggleModal(false)}
          />
        </div>
      </div>
      <div className="mt-8">{renderModal(modalType, modalProps)}</div>
    </div>
  );
};

export default DynamicModal;
