import { Button } from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";
import { User } from "../interface/User.interface";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { toggleNotification } from "@/app/lib/notification";

const DeleteAllUsersModal = ({
  selectedRecords,
  users,
  setUsers
}: {
  selectedRecords: User[];
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>
}) => {

  const deleteUsers = () => {
    toggleNotification(
      `${selectedRecords.length} users deleted successfully"`,
      `${selectedRecords.length} users are deleted from user database. This can't be undone`,
      "success",
    );
    selectedRecords.forEach(async record => {
      setUsers(users.filter((existedUser: User) => existedUser.id != record.id));
      await axios.delete(`${process.env.NEXT_PUBLIC_USERS_URL!}/${record.id}`)
    })
  }
  const openModal = () =>
    modals.openConfirmModal({
      title: <Text fw={600}>Delete all selected users ?</Text>,
      centered: true,
      children: (
        <Text size="sm">
          The following users will be deleted:
          {selectedRecords.map((record) => (
            <Text key={record.id}>{record.name}</Text>
          ))}
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => deleteUsers(),
    });
  return (
    <Button
      onClick={openModal}
      leftSection={<IconTrash size={16} />}
      disabled={selectedRecords.length === 0}
      color="red"
    >
      Delete selected users
    </Button>
  );
};

export default DeleteAllUsersModal;
