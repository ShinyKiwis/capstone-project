"use client";
import React, { SyntheticEvent, useContext, useState } from "react";
import { ModalContext } from "../../providers/ModalProvider";
import { Button, Profile, Typography } from "..";
import CheckBox from "../UserAction/CheckBox";
import {
  User_AdminPage,
  editUser,
  fetchUsers,
} from "@/app/(main)/administrate/users/mockAPI";
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

const UserEditModal = ({ targetUsr }: UserEditModalProps) => {
  const { roles } = useRole();
  let userRoleIds = targetUsr.roles.map((role) => role.id);
  const [selectedRoles, setSelectedRoles] = useState<number[]>(userRoleIds);

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

      let editedUser = await axios.post(
        `http://localhost:3500/users/${targetUsr.id}/roles`,
        {
          roles: selectedRoles.map((selectedId) => {
            return { id: selectedId };
          }),
        },
      );
      queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch users in the cache
      return editedUser;
    }
  }

  return (
    // Check selected roles, does not allow selecting 0
    <div className="h-fit w-[18rem]" key={targetUsr.id}>
      <Profile
        type="horizontal"
        username={targetUsr.name}
        email={targetUsr.email}
      />
      <div className="text-lg font-bold text-blue">Roles</div>
      {/* <div
        className={`text-sm italic text-red ${
          selectedRoles.length <= 0 ? "h-fit opacity-100" : "h-2 opacity-0"
        }`}
      >
        *Must select one or more roles !
      </div> */}
      <div
        className={`text-red text-sm italic ${selectedRoles.length === 0 ? "h-fit opacity-100" : "h-2 opacity-0"}`}
      >
        *Must select one or more roles !
      </div>
      <div>
        {roles.map((role) => (
          <CheckBox
            option={role.name}
            value={role.id}
            valueArray={selectedRoles}
            onChange = {setSelectedRoles}
            defaultChecked={userRoleIds.includes(role.id)}
            key={role.id}
          ></CheckBox>
        ))}
      </div>
      <Button
        isPrimary={true}
        variant="normal"
        onClick={handleApply}
        className="float-right mt-2 px-2 py-1"
        disabled={selectedRoles.length === 0}
      >
        Apply
      </Button>
    </div>
  );
};

export default UserEditModal;
