import { Dispatch, SetStateAction } from 'react';
import { toggleNotification } from "@/app/lib/notification";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import axios from "axios";
import { User } from "../../interfaces/User.interface";
import Program, { Version } from "@/app/interfaces/Program.interface";

type DeleteObject = User | Program | Version;

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
}

const DeleteModal = <T extends DeleteObject>(
  type: string,
  object: T,
  handleDelete: (object: T) => void,
  deleteUrl: string
) => {
  const deleteModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: <Text fw={600}>Are you sure you want to delete {type} "{object.name}" ?</Text>,
      children: (
        <Text size="sm">
          {capitalize(type)} "{object.name}" will be deleted. This action can't be undone!
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: async () => {
        toggleNotification(
          `${capitalize(type)} "${object.name} deleted successfully"`,
          `${capitalize(type)} ${object.name} is deleted from database. This can't be undone`,
          "success",
        );
        handleDelete(object)
        await axios.delete(deleteUrl);
      },
    });
  return deleteModal;
};

export default DeleteModal;