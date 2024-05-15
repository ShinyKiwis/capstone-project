"use client";
import { NavigationContext, PageHeader, UploadFileModal } from "@/app/_components";
import Program, { Version } from "@/app/interfaces/Program.interface";
import { useProgram } from "@/app/providers/ProgramProvider";
import React, { useEffect, useState } from "react";
import { Button, Group, Text, TextInput } from "@mantine/core";
import formatDate from "@/app/lib/formatDate";
import { BiSearch } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import Link from "next/link";
import { AssessScheme } from "@/app/interfaces/Assessment.interface";
import { DataTable } from "mantine-datatable";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoDuplicateOutline } from "react-icons/io5";

const mockSchemes:AssessScheme[] = [
  {
    name:"CS2008_Foundation",
    time:"Year 2008 - Semester 2",
    lastModified:"12/4/2008 12:32:00",
    description:"Foundation test for the year 2008",
  },
  {
    name:"Internship 2008",
    time:"Year 2008 - Semester 2",
    lastModified:"12/4/2008 12:32:00",
    description:"Internship assessment form for the year 2008",
  },
  {
    name:"CS2008_Foundation (Copy)",
    time:"Year 2008 - Semester 2",
    lastModified:"13/4/2008 09:32:00",
    description:"Foundation test for the year 2008",
  },
];

const Page = ({
  params,
}: {
  params: { program_id: string; version_id: string };
}) => {
  const [displayingSchemes, setDisplayingSchemes] = useState<AssessScheme[]>(mockSchemes);
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fileUploaded, setFileUploaded] = useState(false);
  // const {buildBreadCrumbs} = useBreadCrumbs();
  const { getProgram } = useProgram();
  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.program_id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(
          (existedVersion) => existedVersion.id == parseInt(params.version_id),
        )[0];
        // buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });

  return program && version ? (
    <div className="flex h-full flex-col gap-3">
      <PageHeader pageTitle="Assessment Schemes" />
      <NavigationContext program={program} version={version} />

      <div className="mt-2 flex">
        <Button
          variant="filled"
          leftSection={<IoCreate size={20} />}
          component={Link}
          href={`/assessment/programs/${program.id}/versions/${version.id}/schemes/create`}
        >
          Create scheme
        </Button>
        <UploadFileModal
          object="assessment scheme"
          setFileUploaded={setFileUploaded}
        />
        <TextInput
          placeholder="Search scheme name, id, description"
          className="ms-auto w-96"
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
      <DataTable
          withTableBorder
          borderRadius="md"
          striped
          // fetching={fetching}
          highlightOnHover
          records={displayingSchemes}
          columns={[
            {
              accessor: "name",
              title: "Scheme Name",
              sortable: true,
            },
            {
              accessor: "time",
              title: "Assessment Time",
              sortable: true,
            },
            {
              accessor: "lastModified",
              title: "Last Modified",
              sortable: true,
            },
            {
              accessor: "description",
              title: "Description",
            },
            {
              accessor: "actions",
              title: "Actions",
              render: (record) => {
                return (
                  <Group gap={2} justify="center" wrap="nowrap">
                    <Button variant="transparent">
                      <AiOutlineEye size={20}/>
                    </Button>
                    <Button variant="transparent">
                      <AiOutlineEdit size={20} />
                    </Button>
                    <Button variant="transparent">
                      <IoDuplicateOutline size={20} />
                    </Button>
                    <Button variant="transparent" c={"red"}>
                      <AiOutlineDelete size={20} />
                    </Button>
                  </Group>
                );
              },
            },
          ]}
          // paginationText={({ from, to, totalRecords }) =>
          //   `Showing ${from} - ${to} of ${totalRecords}`
          // }
          // sortStatus={sortStatus}
          // onSortStatusChange={setSortStatus}

          // totalRecords={searchedRecords.length>0 ? searchedRecords.length : fetchedRecords.length}
          // recordsPerPage={pageSize}
          // page={page}
          // recordsPerPageOptions={PAGE_SIZES}
          // onRecordsPerPageChange={setPageSize}
          // onPageChange={(p) => setPage(p)}
        />
    </div>
  ) : (
    <div>Program not found</div>
  );
};

export default Page;
