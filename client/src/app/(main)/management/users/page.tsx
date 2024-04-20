"use client";

import { useEffect, useReducer } from "react";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";
import sortBy from "lodash/sortBy";
import { Group, ActionIcon, Box, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { DeleteAllUsersModal, EditUserModal, SettingsModal } from "./components";
import { reducer } from "./components/SettingsModal";
import deleteUserModal from "./components/DeleteUserModal";
import { User } from "./interface/User.interface";
import { PageTitle } from "@/app/_components";

const PAGE_SIZES = [10, 15, 20, 25, 30];

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
      // console.log("USERS MANAGEMENT: ", users);
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
    <div className="flex h-full flex-col gap-3">
      <PageTitle title="Users Management"/>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <SettingsModal hideOptions={hideOptions} dispatch={dispatch} />
          <DeleteAllUsersModal users={users} setUsers={setUsers} selectedRecords={selectedRecords} />
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
