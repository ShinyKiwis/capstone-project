import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { ModalContext } from "../providers/ModalProvider";
import FilterModal from "./Modals/FilterModal";
import StatusModal from "./Modals/StatusModal";
import UploadFileModal from "./Modals/UploadFileModal";

const DynamicModal = () => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const { toggleModal, modalType, modalProps } = modalContextValue;

  const renderModal = (modalType: string, modalProps?: object) => {
    switch (modalType) {
      case "filter":
        return <FilterModal />;
      case "status":
        if (modalProps)
          if (
            // Modal props may be flexible for each type of modal so we check when initiating a modal 
            // rather than set the specific types and keys in modalProps
            'subtype' in modalProps && modalProps.subtype && typeof(modalProps.subtype) == 'string' &&
            'modalContent' in modalProps && modalProps.modalContent
          ){
            return <StatusModal subType={modalProps.subtype} modalContent={modalProps.modalContent}/>;
          }
        return "Missing props for status modal";
      case "upload":
        return <UploadFileModal />;
      default:
        return "Invalid modal type";
    }
  };
  return (
    <div
      className="fixed inset-x-44 inset-y-20 rounded-md border-2 border-lightgray bg-white px-8 py-4"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="relative">
        <div className="absolute right-0">
          <CgClose
            size={30}
            className="cursor-pointer text-lightgray hover:text-blue"
            onClick={() => toggleModal(false)}
          />
        </div>
      </div>
      <div className="mt-8">{renderModal(modalType, modalProps)}</div>
    </div>
  );
};

export default DynamicModal;
