"use client";

import { Profile } from "@/app/_components";
import useRole from "@/app/hooks/useRole";
import { Button, Checkbox, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";

interface UserRolesModalProps {
  opened: boolean;
  setOpen: (opened: boolean) => void;
  targetRows: User_ManageTable[];
}


function UserRolesModal({ opened, setOpen, targetRows }: UserRolesModalProps) {
  const { roles } = useRole();
  // role ids of the selected user (single select case):
  let userRoleIds: number[] =
    targetRows.length === 1 ? targetRows[0].roles.map((role) => role.id) : [];
  const [selectedRoles, setSelectedRoles] = useState<number[]>(userRoleIds);
	useEffect(() => {
		setSelectedRoles(userRoleIds)
	}, [opened]);
	// console.log(`Current render: \nTarget user:${userRoleIds}\nSelected:${selectedRoles}`)

  function handleRoleModify() {
    // Call to API
    console.log(`Applying roles ${selectedRoles} for \n${JSON.stringify(targetRows)}`);
  }

  function renderModalBody(rows: User_ManageTable[]) {
    if (rows.length < 1)
      return <div className="text-red-500 px-4 py-2 font-medium">Please select at least one user to edit !</div>;

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
      const value = parseInt(event.target.value);
      if (event.target.checked) {
        setSelectedRoles([...selectedRoles, value]);
      } else {
        setSelectedRoles(selectedRoles.filter((item) => item !== value));
      }
    }

    return (
      <>
        <div className="py-2 pl-4">
          <div className="mb-2 text-lg font-medium">Modify roles of:</div>
          <div className="max-h-72 overflow-auto px-2 py-4">
            {rows.map((row) => {
              return (
                <Profile
                  type="horizontal"
                  username={row.name}
                  email={row.email}
                  key={row.id}
                />
              );
            })}
          </div>
          <div className="my-2 text-lg font-bold text-blue-700">Roles</div>
          <div
            className={`text-red mb-2 text-sm italic ${selectedRoles.length === 0 ? "h-fit opacity-100" : "h-2 opacity-0"}`}
          >
            *Must select one or more roles !
          </div>
          <div className="flex flex-col gap-2 max-h-40 overflow-auto">
            {roles &&
              roles.map((role) => (
                <Checkbox
                  defaultChecked={userRoleIds.includes(role.id)}
                  label={role.name}
                  value={role.id}
                  onChange={handleCheckboxChange}
                  key={role.id}
                />
              ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-10 bg-gray-400 px-10 py-2">
          <Button
            variant="filled"
            onClick={handleRoleModify}
            className="mt-2 px-2 py-1 drop-shadow-lg"
            disabled={selectedRoles.length === 0}
          >
            Apply
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => {
              setOpen(false);
            }}
            className="mt-2 px-2 py-1 drop-shadow-lg"
            disabled={selectedRoles.length === 0}
          >
            Cancel
          </Button>
        </div>
      </>
    );
  }

	
  return (
    <Modal.Root
      opened={opened}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <div className="flex items-center gap-4">
              <CiCircleInfo size={60} color="blue" />
              <span className="text-xl font-semibold">Edit user`&lsquo;`s role</span>
            </div>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          {renderModalBody(targetRows)}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default UserRolesModal;
