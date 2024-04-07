import { toggleNotification } from "@/app/lib/notification";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import axios from "axios";
import { User } from "../../interfaces/User.interface";

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
}

const DeleteModal = (
  type: string,
  object: User,
  objects: (User)[],
  setObjects: (objects: (User)[]) => void,
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
        setObjects(objects.filter((existedObject) => existedObject.id != object.id));
        await axios.delete(deleteUrl);
      },
    });
  return deleteModal;
};

export default DeleteModal;