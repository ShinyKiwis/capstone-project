"use client";
import { CreateProgramModal, UploadFileModal } from "@/app/_components";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { ActionIcon, Box, Group, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const records = [
  {
    id: 1,
    name: "Computer Science",
    major: "Computer Science",
    description: "Computer Science",
  },
  {
    id: 2,
    name: "Software Engineering",
    major: "Software Engineering",
    description: "Software Engineering",
  },
  {
    id: 3,
    name: "Information Technology",
    major: "Information Technology",
    description: "Information Technology",
  },
  {
    id: 4,
    name: "Information Systems",
    major: "Information Systems",
    description: "Information Systems",
  },
  {
    id: 5,
    name: "Data Science",
    major: "Data Science",
    description: "Data Science",
  },
]

const Program = () => {
  const { updateBreadCrumb } = useBreadCrumbs();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    updateBreadCrumb("Programs Management", "/program");
  }, []);
  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <CreateProgramModal />
        <UploadFileModal
          object="general programs"
          setFileUploaded={setFileUploaded}
        />
        <TextInput
          placeholder="Search general program..."
          className="ms-auto w-72"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          rightSection={
            <BiSearch
              size={20}
              className="group-focus-within:text-blue text-gray"
              onClick={(e) => {}}
            />
          }
        />
      </div>
      <div className="mt-4 h-full overflow-auto pb-4">
        <DataTable
          withTableBorder
          columns={[
            {
              accessor: "id",
              title: "Program ID",
              width: "10%",
              sortable: true,
            },
            {
              accessor: "name",
              title: "Program Name",
              sortable: true,
            },
            {
              accessor: "major",
              title: "Major",
              sortable: true,
            },
            {
              accessor: "description",
              title: "Description",
              width: "40%",
              sortable: true,
            },
            {
              accessor: "actions",
              width: "5%",
              title: <Box mr={6}>Actions</Box>,
              render: (record) => {
                return (
                  <Group gap={4} justify="center" wrap="nowrap">
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
          records={records}
        />
      </div>
    </div>
  );
};

export default Program;
