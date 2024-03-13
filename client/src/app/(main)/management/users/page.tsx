"use client";

import { useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import randomUsers from "./data/randomUser";
import sortBy from "lodash/sortBy";
import { Group, ActionIcon, Box } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const PAGE_SIZES = [10, 15, 20, 25, 30];

const Users = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(randomUsers.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "",
    direction: "",
  });
  const [selectedRecords, setSelectedRecords] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(randomUsers.slice(from, to));
  }, [page, pageSize]);

  useEffect(() => {
    const data = sortBy(records, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);
  return (
    <div className="mt-4 h-full overflow-auto">
      <DataTable
        withTableBorder
        borderRadius="md"
        striped
        highlightOnHover
        records={records}
        columns={[
          { accessor: "id", title: "ID", width: "10%", sortable: true },
          { accessor: "name", title: "Name", sortable: true },
          { accessor: "role", title: "Roles", width: "40%", sortable: true },
          {
            accessor: "actions",
            width: "5%",
            title: <Box mr={6}>Actions</Box>,
            render: () => {
              return (
                <Group gap={4} justify="center" wrap="nowrap">
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="blue"
                    onClick={() => {}}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={() => {}}
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
        totalRecords={randomUsers.length}
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
