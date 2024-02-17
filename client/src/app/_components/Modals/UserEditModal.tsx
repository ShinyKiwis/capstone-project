"use client";
import React, { SyntheticEvent, useContext, useRef, useState } from "react";
import { ModalContext } from "../../providers/ModalProvider";
import { Button, Profile, Typography } from "..";
import { MdOutlineFileUpload } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { FaAngleDoubleDown, FaRegFileWord } from "react-icons/fa";
import CheckBox from "../UserAction/CheckBox";

export interface UserEditModalProps {
  targetUsr: {
    id: string | number;
    fullName: string;
    email: string;
    [key: string]: any; // accepting other properties
  };
  position: {
    x: number;
    y: number;
  };
}

const userRoles = ["teacher", "student", "ATP", "dean"]; // retreive from db ?

const UserEditModal = ({ targetUsr }: UserEditModalProps) => {
  const [selectedRoles, setSelectedRoles] = useState([...targetUsr.roles]);

  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error("Modal context initialization failed !");
    return null;
  }
  const { toggleModal } = modalContextValue;

  function handleApply() {
    alert(`Applying roles ${selectedRoles} -> for user ${targetUsr.id}`);
    toggleModal(false);
  }

  return (
    <div className="h-fit w-[18rem]">
      <Profile
        type="horizontal"
        username={targetUsr.fullName}
        email={targetUsr.email}
      />
      <div className="text-lg font-bold text-blue">Roles</div>
      <div>
        {userRoles.map((role) => (
          <CheckBox option={role} valueArray={selectedRoles} defaultChecked={targetUsr.roles.includes(role)} key={role}></CheckBox>
        ))}
      </div>
      <Button isPrimary={true} variant="normal" onClick={handleApply} className="px-2 py-1">
        Apply options
      </Button>
    </div>
  );
};

export default UserEditModal;
