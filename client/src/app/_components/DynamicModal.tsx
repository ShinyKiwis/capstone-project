import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import ActivateProjectModal from "./Modals/ActivateProjectModal";
import { title } from "process";
import RoleChangeModal, { UserEditModalProps } from "./Modals/UserEditModal";
import UserEditModal from "./Modals/UserEditModal";

type definedModalProps = StatusModalProps | ActionModalProps | UserEditModalProps | any;

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
        return <SuccessModal title="Enrolled successfully!" />;
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
      case "project_activation":
        const [id, action] = modalProps.title.split("-")
        return <ActivateProjectModal projectId={id} action={action} />
      case "project_approval":
        return <SuccessModal title="Approved this project successfully!"/>
      case "project_denial":
        return <ProjDenyModal />;
      case "upload":
        return <UploadFileModal />;
      case "customPos_user_edit":
        return <UserEditModal targetUsr={modalProps.targetUsr} position={modalProps.position}/>;
      default:
        return "Invalid modal type";
    }
  };

  // Place the modal at specific coords on the screen while preventing overflowing viewport
  const modalRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useLayoutEffect(() => {
    if (modalRef.current) {
      setDimensions({
        width: modalRef.current.offsetWidth,
        height: modalRef.current.offsetHeight
      });
    }
  }, []);
  
  var posY = '';
  var posX = '';
  if (modalProps.position){
    posX = Math.round(modalProps.position.x-dimensions.width).toString()+'px';

    let yCoord = Math.round(modalProps.position.y);
    // Prevent modal from overflowing
    if (yCoord + dimensions.height > window.innerHeight)
      posY = (window.innerHeight - dimensions.height - 10).toString()+'px'
    else
      posY = yCoord.toString()+'px'
  }
  

  return (
    <div
      ref={modalRef}
      className={`${modalType.includes("customPos_") ? '' : 'inset-x-0 inset-y-1/2 m-auto'} fixed h-fit min-h-40 w-fit min-w-64 rounded-md border-2 border-lightgray bg-white px-10 py-6`}
      style={modalType.includes("customPos_") ?
        { 
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", 
          top: posY,
          left: posX
        }
        :
        {
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", 
        }
    }
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
