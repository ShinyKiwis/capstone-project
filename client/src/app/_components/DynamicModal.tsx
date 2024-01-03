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
        if (modalProps){
          if (
            // Modal props may be flexible for each type of modal so we check when initiating a modal 
            // rather than set the specific types and keys in modalProps
            'subType' in modalProps && modalProps.subType && typeof(modalProps.subType) == 'string'
          ){
            if ('modalContent' in modalProps && modalProps.modalContent)
              return <StatusModal subType={modalProps.subType} modalContent={modalProps.modalContent}/>;
            else
              return <StatusModal subType={modalProps.subType} />;
            console.log('Here')
          }
          else{
            return "Invalid props: " + JSON.stringify(modalProps);
          }
        }
        else{
          console.log('Current props:', modalProps)
          return "Missing props for status modal";
        }
          
        
      case "upload":
        return <UploadFileModal />;
      default:
        return "Invalid modal type";
    }
  };
  return (
    <div
      className="fixed inset-x-0 inset-y-1/2 w-fit h-fit min-w-64 min-h-40 m-auto rounded-md border-2 border-lightgray bg-white px-10 py-6"
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
