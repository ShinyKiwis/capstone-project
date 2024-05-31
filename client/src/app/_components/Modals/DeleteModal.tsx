import { Dispatch, SetStateAction } from 'react';
import { toggleNotification } from "@/app/lib/notification";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import axios from "axios";
import { User } from "../../interfaces/User.interface";
import Program, { PEO, PI, SO, Version } from "@/app/interfaces/Program.interface";

type DeleteObject = User | Program | Version | SO | PEO | PI;

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
      title: <Text fw={600}>Confirm deletion</Text>,
      children: (
        <Text size="sm">
          Are you sure you want to delete {type} "{object.name}"?. This action can not be undone!
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: async () => {
        axios.delete(deleteUrl)
        .then(res => {
          toggleNotification(
            `${capitalize(type)} deleted successfully`,
            `${capitalize(type)} ${object.name} is deleted from database.`,
            "success",
          );
          handleDelete(object)
        })
        .catch(err => {
          toggleNotification(
            `${capitalize(type)} deletion failed`,
            `Can not delete ${capitalize(type)} ${object.name}`,
            "danger",
          );
          console.log(`Err deleting ${type}`, err);
        })
      },
    });
  return deleteModal;
};

export default DeleteModal;
