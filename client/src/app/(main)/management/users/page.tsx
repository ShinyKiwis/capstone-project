"use client";

import { Dispatch, useEffect, useReducer } from "react";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";
import sortBy from "lodash/sortBy";
import {
  Group,
  ActionIcon,
  Box,
  Text,
  Modal,
  Popover,
  Avatar,
  MultiSelect,
  Badge,
  CloseButton,
  Button,
  TextInput,
  Stack,
  Checkbox,
} from "@mantine/core";
import { IconEdit, IconTrash, IconSettings } from "@tabler/icons-react";
import axios from "axios";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { toggleNotification } from "@/app/lib/notification";
import { useRoles } from "@/app/providers/RolesProvider";

const PAGE_SIZES = [10, 15, 20, 25, 30];

// This is interface for this page only, not the universal one!
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: {
    id?: number;
    roleName: string;
    resources: string[];
  }[];
  [key: string]: any;
}

const deleteUserModal = (
  user: User,
  users: User[],
  setUsers: (users: User[]) => void,
) => {
  const deleteModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: `Are you sure you want to delete user "${user.name}"`,
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
          `User ${user.name} is deleted from user database. This can't be undone`,
          "success",
        );
        setUsers(users.filter((existedUser) => existedUser.id != user.id));
        await axios.delete(`${process.env.NEXT_PUBLIC_USERS_URL!}/${user.id}`);
      },
    });
  return deleteModal;
};

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

type State = {
  id: boolean;
  name: boolean;
  email: boolean;
  roles: boolean;
};

type Action =
  | { type: "toggleId" }
  | { type: "toggleName" }
  | { type: "toggleEmail" }
  | { type: "toggleRoles" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "toggleId":
      return {
        ...state,
        id: !state.id,
      };
    case "toggleName":
      return {
        ...state,
        name: !state.name,
      };
    case "toggleEmail":
      return {
        ...state,
        email: !state.email,
      };
    case "toggleRoles":
      return {
        ...state,
        roles: !state.roles,
      };
  }
};

const SettingsModal = ({
  hideOptions,
  dispatch,
}: {
  hideOptions: State;
  dispatch: Dispatch<Action>;
}) => {
  return (
    <Popover shadow="md" position="bottom">
      <Popover.Target>
        <Button leftSection={<IconSettings size={16} />}>Settings</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Text fw={600} c="blue">
            Hide columns
          </Text>
          <Checkbox
            label='Hide "ID" column'
            checked={hideOptions.id}
            onChange={() => {
              dispatch({ type: "toggleId" });
            }}
          />
          <Checkbox
            label='Hide "Name" column'
            checked={hideOptions.name}
            onChange={() => {
              dispatch({ type: "toggleName" });
            }}
          />
          <Checkbox
            label='Hide "Email" column'
            checked={hideOptions.email}
            onChange={() => {
              dispatch({ type: "toggleEmail" });
            }}
          />
          <Checkbox
            label='Hide "Roles" column'
            checked={hideOptions.roles}
            onChange={() => {
              dispatch({ type: "toggleRoles" });
            }}
          />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

const Users = () => {
  const [hideOptions, dispatch] = useReducer(reducer, {
    id: false,
    name: false,
    email: false,
    roles: false,
  });
  const [fetching, setFetching] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<User[]>([]);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<User>>({
    columnAccessor: "id",
    direction: "asc",
  });
  const [selectedRecords, setSelectedRecords] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      // This transformation is caused by inconsistent name between FE and BE.
      // Dear future programmers, please fix this.
      const response = await axios.get(process.env.NEXT_PUBLIC_USERS_URL!);
      response.data.users = response.data.users.map((user: any) => {
        return {
          ...user,
          roles: user.roles.map((role: any) => {
            return {
              id: role.id,
              roleName: role.name,
              resources: role.resources,
            };
          }),
        };
      });
      setUsers(response.data.users);
    };
    if (users.length === 0) {
      fetchUsers();
    } else {
      console.log("USERS MANAGEMENT: ", users);
      setRecords(users);
      setFetching(false);
    }
  }, [users]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(users.slice(from, to));
  }, [page, pageSize]);

  useEffect(() => {
    const data = sortBy(records, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  useEffect(() => {
    const deepSearch = (obj: User, searchQuery: string) => {
      for (const key in obj) {
        const value = obj[key];
        const stringValue = String(value); // Convert value to string
        if (stringValue.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true;
        }
        if (typeof value === "object" && value !== null) {
          if (deepSearch(value, searchQuery)) {
            return true;
          }
        }
      }
      return false;
    };
    if (searchQuery) {
      setRecords(users.filter((user) => deepSearch(user, searchQuery)));
    } else {
      setRecords(users);
    }
  }, [searchQuery]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <SettingsModal hideOptions={hideOptions} dispatch={dispatch} />
        </div>
        <TextInput
          placeholder="Search users"
          className="ms-auto"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
      </div>
      <div className="mt-4 h-full overflow-auto pb-4">
        <DataTable
          withTableBorder
          borderRadius="md"
          striped
          fetching={fetching}
          highlightOnHover
          records={records}
          columns={[
            {
              accessor: "id",
              title: "ID",
              width: "10%",
              sortable: true,
              hidden: hideOptions.id,
            },
            {
              accessor: "name",
              title: "Name",
              sortable: true,
              hidden: hideOptions.name,
            },
            {
              accessor: "email",
              title: "Email",
              sortable: true,
              hidden: hideOptions.email,
            },
            {
              accessor: "roles",
              title: "Roles",
              width: "40%",
              hidden: hideOptions.roles,
              sortable: true,
              render: (record) => {
                return record.roles.length !== 0
                  ? record.roles.map((role) => role.roleName).join(", ")
                  : ["No role is assigned"];
              },
            },
            {
              accessor: "actions",
              width: "5%",
              title: <Box mr={6}>Actions</Box>,
              render: (record) => {
                return (
                  <Group gap={4} justify="center" wrap="nowrap">
                    <EditUserModal
                      user={record}
                      users={users}
                      setUsers={setUsers}
                    />
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      color="red"
                      onClick={deleteUserModal(record, users, setUsers)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                );
              },
            },
          ]}
          loadingText="Loading"
          paginationText={({ from, to, totalRecords }) =>
            `Showing ${from} - ${to} of ${totalRecords}`
          }
          totalRecords={users.length}
          recordsPerPage={pageSize}
          page={page}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          onPageChange={(p) => setPage(p)}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
        />
      </div>
    </div>
  );
};

export default Users;
