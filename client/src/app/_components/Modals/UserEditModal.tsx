"use client";
import React, { SyntheticEvent, useContext, useRef, useState } from "react";
import { ModalContext } from "../../providers/ModalProvider";
import { Button, Profile, Typography } from "..";
import { MdOutlineFileUpload } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { FaAngleDoubleDown, FaRegFileWord } from "react-icons/fa";
import CheckBox from "../UserAction/CheckBox";
import { User_AdminPage, editUser, fetchUsers } from "@/app/(main)/administrate/mockAPI";
import { useQueryClient } from "@tanstack/react-query";
import { useRole } from "@/app/hooks";
import axios from "axios";

export interface UserEditModalProps {
  targetUsr: User_AdminPage;
  position: {
    x: number;
    y: number;
  };
}

const userRoles = [
  {
    id: 1,
    name: "Student",
  },
  {
    id: 2,
    name: "Teacher",
  },
  // {
  //   id: 3,
  //   name: "Department Head",
  // },
  // {
  //   id: 4,
  //   name: "Program Chair",
  // },
  {
    id: 5,
    name: "Dean",
  },
  {
    id: 6,
    name: "ATP",
  },
]; // retreive from db ?

function mapRolenamesToIds(roleNames: String[]) {
  let mappedIds: Number[] = [];
  roleNames.forEach((name) => {
    let matchingRole = userRoles.find((role) => role.name === name);
    if (matchingRole) mappedIds.push(matchingRole.id);
  });

  return mappedIds;
}

const UserEditModal = ({ targetUsr }: UserEditModalProps) => {
  const {roles} = useRole();
  let userRoleIds = targetUsr.roles.map(role => role.id);
  const [selectedRoles, setSelectedRoles] = useState(userRoleIds);

  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error("Modal context initialization failed !");
    return null;
  }
  const { toggleModal } = modalContextValue;
  const queryClient = useQueryClient();

  async function handleApply() {
    // alert(`Applying roles ${selectedRoles} -> for user ${targetUsr.id}`);
    toggleModal(false);

    if (selectedRoles) {
      // // Call edit role API, passing in target user's id and list of new role IDs
      // editUser(targetUsr.id, selectedRoles);

      let editedUser = await axios.post(`http://localhost:3500/users/${targetUsr.id}/roles`,{
        roles:selectedRoles.map(selectedId => {return {id:selectedId}})
      })
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  }

  return (
    <div className="h-fit w-[18rem]">
      <Profile
        type="horizontal"
        username={targetUsr.name}
        email={targetUsr.email}
      />
      <div className="text-lg font-bold text-blue">Roles</div>
      <div>
        {roles.map((role) => (
          <CheckBox
            option={role.name}
            value={role.id}
            valueArray={selectedRoles}
            defaultChecked={userRoleIds.includes(role.id)}
            key={role.id}
          ></CheckBox>
        ))}
      </div>

        <Button
          isPrimary={true}
          variant="normal"
          onClick={handleApply}
          className="mt-2 px-2 py-1 float-right"
        >
          Apply
        </Button>
    </div>
  );
};

export default UserEditModal;
