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
import UploadFileModal from "./Modals/UploadFileModal";

type definedModalProps = StatusModalProps | ActionModalProps;

const DynamicModal = () => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const { toggleModal, modalType, modalProps } = modalContextValue;

  const renderModal = (modalType: string, modalProps: definedModalProps) => {
    switch (modalType) {
      case "filter":
        return <FilterModal />;
      case "status_success":
        return <SuccessModal title="Project enrolled successfully !" />;
      case "status_warning":
        return <WarningModal title={modalProps?.title} messages={modalProps?.messages} />;
      case "project_unerollment":
        return(
          <RemovalModal 
            title="Unenroll from this project ?" 
            messages={["This action will remove your from the members list of this project."]} 
            buttonLabels={["Unenroll", "Cancel"]} 
          />
        )
      case "project_deletion":
        return(
          <RemovalModal 
            title="Delete this project ?" 
            messages={["This action cannot be undone !"]} 
            buttonLabels={["Delete", "Cancel"]} 
          />
        )
      case "project_denial":
        return(
          <ProjDenyModal />
        )
      case "upload":
        return <UploadFileModal />;
      default:
        return "Invalid modal type";
    }
  };
  return (
    <div
      className="min-w-64 min-h-40 fixed inset-x-0 inset-y-1/2 m-auto h-fit w-fit rounded-md border-2 border-lightgray bg-white px-10 py-6"
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
