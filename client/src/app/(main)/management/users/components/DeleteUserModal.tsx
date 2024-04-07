import { toggleNotification } from "@/app/lib/notification";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import axios from "axios";
import { User } from "../interface/User.interface";

const deleteUserModal = (
  user: User,
  users: User[],
  setUsers: (users: User[]) => void,
) => {
  const deleteModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: <Text fw={600}>Are you sure you want to delete user "{user.name}" ?</Text>,
      children: (
        <Text size="sm">
          User "{user.name}" will be deleted. This action can't be undone!
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: async () => {
        toggleNotification(
          `User "${user.name} deleted successfully"`,
          `User ${user.name} is deleted from database. This can't be undone`,
          "success",
        );
        setUsers(users.filter((existedUser) => existedUser.id != user.id));
        await axios.delete(`${process.env.NEXT_PUBLIC_USERS_URL!}/${user.id}`);
      },
    });
  return deleteModal;
};

export default deleteUserModal;
