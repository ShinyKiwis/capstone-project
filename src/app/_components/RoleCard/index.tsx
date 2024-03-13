import React from "react";
import { Card, Text, Group, Button, Flex, Avatar } from "@mantine/core";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { RoleModal } from "..";
import { Role, useRoles } from "@/app/providers/RolesProvider";
import { openConfirmModal } from "@mantine/modals";
import { toggleNotification } from "@/app/lib/notification";
interface RoleCardProps {
  role?: Role;
}

const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  const { roles, setRoles } = useRoles();

  const closeModal = () =>
    openConfirmModal({
      title: (
        <Text size="md" c="red" fw={600}>
          Delete role {role?.roleName} ?
        </Text>
      ),
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete {role?.roleName} ? This action can't
          be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        setRoles(
          roles.filter(
            (existingRole) => existingRole.roleName != role?.roleName,
          ),
        );
        toggleNotification(
          `Delete role ${role?.roleName} successfully`,
          `Role ${role?.roleName} is deleted. This action can't be undone, recreate if necessary.`,
          "success",
        );
      },
    });

  return (
    <Card
      className="flex flex-col items-center shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
      h="100%"
      shadow="xs"
      padding="md"
      radius="md"
      withBorder
    >
      <Card.Section py="md" inheritPadding>
        <Flex
          gap="md"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Avatar color="blue" size="xl">
            {role!.roleName.split(" ").map((word) => word[0].toUpperCase())}
          </Avatar>
          <Text fw={500} size="lg" className="mt-2 text-center">
            {role!.roleName}
          </Text>
        </Flex>
      </Card.Section>
      <Card.Section py="xs" inheritPadding>
        <Group justify="center">
          <div>
            <RoleModal Icon={AiOutlineEdit} action="Edit" role={role} />
          </div>
          <div>
            <Button
              variant="filled"
              color="red"
              leftSection={<AiOutlineDelete />}
              onClick={closeModal}
            >
              Delete
            </Button>
          </div>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default RoleCard;
