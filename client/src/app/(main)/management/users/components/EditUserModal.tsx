import { toggleNotification } from "@/app/lib/notification";
import { useRoles } from "@/app/providers/RolesProvider";
import { ActionIcon, Avatar, Badge, Button, CloseButton, Group, MultiSelect, Popover, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios"
import {User} from "../interface/User.interface"

interface EditUserModalProps {
  user: User;
  users: User[];
  setUsers: (users: User[]) => void;
}

const EditUserModal = ({ user, users, setUsers }: EditUserModalProps) => {
  const { roles } = useRoles();

  const [loadedRoles, setLoadedRoles] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    user.roles.map((role) => role.roleName),
  );

  const handleSelectRoles = (values: string[]) => {
    setLoadedRoles(
      roles
        .filter((role) => role.roleName != values[0])
        .filter((role) => !selectedRoles.includes(role.roleName))
        .map((role) => role.roleName),
    );
    setSelectedRoles([...selectedRoles, values[0]]);
  };

  const handleUnselectRole = (value: string) => {
    setLoadedRoles([...loadedRoles, value]);
    setSelectedRoles(selectedRoles.filter((role) => role !== value));
  };

  const handleUpdateRole = async (userId: number) => {
    await axios.post(`${process.env.NEXT_PUBLIC_USERS_URL!}/${userId}/roles`, {
      roles: roles
        .filter((role) => selectedRoles.includes(role.roleName))
        .map((role) => {
          return { id: role.id };
        }),
    });
    setOpened(false);
    toggleNotification(
      "Update successful",
      `Update roles for user with id ${userId} has succeeded`,
      "success",
    );
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            roles: roles.filter((role) =>
              selectedRoles.includes(role.roleName),
            ),
          };
        } else {
          return user;
        }
      }),
    );
  };

  useEffect(() => {
    setLoadedRoles(
      roles
        .filter(
          (role) =>
            !user.roles
              .map((userRole) => userRole.roleName)
              .includes(role.roleName),
        )
        .map((role) => role.roleName),
    );
  }, [roles]);

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      shadow="md"
      position="left-start"
      offset={20}
    >
      <Popover.Target>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="blue"
          onClick={() => setOpened(!opened)}
        >
          <IconEdit size={16} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="p-4">
          <div className="flex items-center gap-4">
            <Avatar variant="light" size="lg" radius="xl" color="blue">
              {user.name
                .split(" ")
                .slice(-2)
                .map((word) => word[0].toUpperCase())}
            </Avatar>
            <div className="flex flex-col gap-2">
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
          <Text fw={600} size="md" c="blue" mt="md" mb="sm">
            Roles
          </Text>
          <MultiSelect
            placeholder="Select programs"
            value={[]}
            onChange={handleSelectRoles}
            comboboxProps={{ withinPortal: false }}
            data={loadedRoles}
            searchable
          />
          <div className="mt-2 flex w-1/2 flex-col gap-2">
            {selectedRoles.map((selectedRole) => (
              <Badge
                variant="light"
                radius="sm"
                key={selectedRole}
                rightSection={
                  <CloseButton
                    size={20}
                    variant="transparent"
                    c="blue"
                    onClick={() => handleUnselectRole(selectedRole)}
                  />
                }
                fullWidth
                size="lg"
                className="flex justify-between normal-case"
              >
                {selectedRole}
              </Badge>
            ))}
          </div>
        </div>
        <Group justify="flex-end" gap="xs">
          <Button onClick={() => setOpened(false)} variant="outline">
            Cancel
          </Button>
          <Button
            variant="filled"
            onClick={() => {
              handleUpdateRole(user.id);
            }}
          >
            Update
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default EditUserModal