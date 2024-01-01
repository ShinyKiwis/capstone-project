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
  const { toggleModal, modalType } = modalContextValue;

  const renderModal = (modalType: string) => {
    switch (modalType) {
      case "filter":
        return <FilterModal />;
      case "status":
        return <StatusModal />;
      case "upload":
        return <UploadFileModal />;
      default:
        return;
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
      <div className="mt-8">{renderModal(modalType)}</div>
    </div>
  );
};

export default DynamicModal;
