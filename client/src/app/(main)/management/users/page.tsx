"use client";

import { useEffect } from "react";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";
import sortBy from "lodash/sortBy";
import {
  Group,
  ActionIcon,
  Box,
  Text,
  Modal,
  Menu,
  Avatar,
  MultiSelect,
  Badge,
  CloseButton,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
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
  roles: string[];
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
  return (
    <Menu shadow="md" position="left-start" offset={20} onChange={() => {}}>
      <Menu.Target>
        <ActionIcon size="sm" variant="subtle" color="blue">
          <IconEdit size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
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
          <Text fw={600} size="md" c="blue" mt="md">
            Roles
          </Text>
          <MultiSelect
            placeholder="Select programs"
            data={["React", "Vue"]}
            searchable
          />
          {/* <div className="mt-2 flex w-1/2 flex-col gap-2">
            {selectedPrograms.map((selectedProgram) => (
              <Badge
                variant="light"
                radius="sm"
                rightSection={
                  <CloseButton
                    size={20}
                    variant="transparent"
                    c="blue"
                    onClick={() => handleUnselectProgram(selectedProgram)}
                  />
                }
                fullWidth
                size="lg"
                className="flex justify-between normal-case"
              >
                {selectedProgram}
              </Badge>
            ))}
          </div> */}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

const Users = () => {
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

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_USERS_URL!);
      setUsers(response.data.users);
    };
    if (users.length === 0) {
      fetchUsers();
    } else {
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
  return (
    <div className="mt-4 h-full overflow-auto pb-8">
      <DataTable
        withTableBorder
        borderRadius="md"
        striped
        fetching={fetching}
        highlightOnHover
        records={records}
        columns={[
          { accessor: "id", title: "ID", width: "10%", sortable: true },
          { accessor: "name", title: "Name", sortable: true },
          { accessor: "email", title: "Email", sortable: true },
          {
            accessor: "roles",
            title: "Roles",
            width: "40%",
            sortable: true,
            render: (record) => {
              return record.roles.length !== 0
                ? record.roles
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
  );
};

export default Users;
