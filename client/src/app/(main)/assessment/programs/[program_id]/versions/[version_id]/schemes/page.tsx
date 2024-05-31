"use client";
import {
  NavigationContext,
  PageHeader,
  UploadFileModal,
} from "@/app/_components";
import Program, { Version } from "@/app/interfaces/Program.interface";
import { useProgram } from "@/app/providers/ProgramProvider";
import React, { useEffect, useState } from "react";
import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import formatDate from "@/app/lib/formatDate";
import { BiSearch } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import Link from "next/link";
import { AssessSchemeListItem } from "@/app/interfaces/Assessment.interface";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoDuplicateOutline } from "react-icons/io5";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { sortBy } from "lodash";
import useNavigate from "@/app/hooks/useNavigate";
import { toggleNotification } from "@/app/lib/notification";
import { useDisclosure } from "@mantine/hooks";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";

// const mockSchemes:AssessSchemeListItem[] = [
//   {
//     name:"CS2008_Foundation",
//     generation: '2008',
//     time:"Year 2008 - Semester 2",
//     lastModified:"12/4/2008 12:32:00",
//     description:"Foundation test for the year 2008",
//   },
//   {
//     name:"Internship 2008",
//     generation: '2008',
//     time:"Year 2008 - Semester 2",
//     lastModified:"12/4/2008 12:32:00",
//     description:"Internship assessment form for the year 2008",
//   },
//   {
//     name:"CS2008_Foundation (Copy)",
//     generation: '2008',
//     time:"Year 2008 - Semester 2",
//     lastModified:"13/4/2008 09:32:00",
//     description:"Foundation test for the year 2008",
//   },
// ];

const Page = ({
  params,
}: {
  params: { program_id: string; version_id: string };
}) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const PAGE_SIZES = [10, 20, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<AssessSchemeListItem>
  >({
    columnAccessor: "id",
    direction: "asc",
  });
  const [fileUploaded, setFileUploaded] = useState(false);

  const {buildBreadCrumbs} = useBreadCrumbs();
  const { getProgram } = useProgram();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get program, version info at page load to build context section
  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.program_id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(
          (existedVersion) => existedVersion.id == parseInt(params.version_id),
        )[0];
        buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });

  // Fetch schemes
  const { data: fetchedSchemes, isLoading: schemesIsLoading } = useQuery({
    queryFn: async () => {
      let queryURL = `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.program_id}/versions/${params.version_id}/assessment-schemes`;
      let response = await (await axios.get(queryURL)).data;
      console.log("refetched schemes");
      setDisplayingSchemes(response);
      dividePages(response);
      return response;
    },
    queryKey: ["scheme"],
    enabled: true,
    staleTime: Infinity,
  });

  const [displayingSchemes, setDisplayingSchemes] =
    useState<AssessSchemeListItem[]>(fetchedSchemes);
  const [searchedRecords, setSearchedRecords] = useState<
    AssessSchemeListItem[]
  >([]);

  // Hanlde search
  function handleSearchRecords(searchTerm?: string) {
    if (!searchTerm) searchTerm = searchQuery;
    if (searchTerm === "") {
      setSearchedRecords([]);
      dividePages(fetchedSchemes);
      return;
    }

    let results = fetchedSchemes.filter((record: AssessSchemeListItem) => {
      return (
        record.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setSearchedRecords(results);
    dividePages(results);
    setPage(1);
  }

  // useEffect for sorting
  useEffect(() => {
    const data = sortBy(
      displayingSchemes,
      sortStatus.columnAccessor,
    ) as AssessSchemeListItem[];
    setDisplayingSchemes(
      sortStatus.direction === "desc" ? data.reverse() : data,
    );
  }, [sortStatus]);

  // Funtion handling pagination
  function dividePages(itemsList?: any[]) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    if (itemsList) {
      setDisplayingSchemes(itemsList.slice(from, to));
      return;
    }

    setDisplayingSchemes(
      searchedRecords.length > 0
        ? searchedRecords.slice(from, to)
        : fetchedSchemes && fetchedSchemes.slice(from, to),
    );
  }

  // useEffect for pagination
  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    dividePages();
  }, [page, pageSize]);

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
        {/* <UploadFileModal
          object="assessment scheme"
          setFileUploaded={setFileUploaded}
        /> */}
        <TextInput
          placeholder="Search scheme name, id, description"
          className="ms-auto w-96"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter")
              handleSearchRecords(event.currentTarget.value);
          }}
          rightSection={
            <BiSearch
              size={20}
              className="group-focus-within:text-blue text-gray"
              onClick={(e) => {
                handleSearchRecords();
              }}
            />
          }
        />
      </div>
      <DataTable
        withTableBorder
        borderRadius="md"
        striped
        fetching={schemesIsLoading}
        highlightOnHover
        records={displayingSchemes}
        columns={[
          {
            accessor: "name",
            title: "Scheme Name",
            sortable: true,
          },
          {
            accessor: "generation",
            title: "Generation",
            sortable: true,
          },
          {
            accessor: "semester.year",
            title: "Assessment Time",
            render: (record) =>
              `${record.semester?.year || 2008} - Sem. ${record.semester?.no || 1}`,
            sortable: true,
          },
          // {
          //   accessor: "lastModified",
          //   title: "Last Modified",
          //   sortable: true,
          // },
          {
            accessor: "description",
            title: "Description",
          },
          {
            accessor: "actions",
            title: "Actions",
            textAlign: "left",
            render: (record, index) => {
              const [delModalOpened, { open, close }] = useDisclosure(false);
              return (
                <Group gap={6} justify="center" wrap="nowrap">
                  <Button variant="transparent" px={0}>
                    <AiOutlineEye
                      size={20}
                      onClick={() => {
                        navigate(`schemes/${record.id}`);
                      }}
                    />
                  </Button>
                  <Button variant="transparent" px={0}>
                    <AiOutlineEdit
                      size={20}
                      onClick={() => {
                        navigate(`schemes/edit/${record.id}`);
                      }}
                    />
                  </Button>
                  <Button
                    variant="transparent"
                    px={0}
                    onClick={async () => {
                      axios
                        .post(
                          `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${program.id}/versions/${version.id}/assessment-schemes/${record.id}/duplicate`,
                        )
                        .then(async (res) => {
                          queryClient.invalidateQueries({
                            queryKey: ["scheme"],
                          });
                          toggleNotification(
                            "Success",
                            `Scheme duplicated!`,
                            "success",
                          );
                        })
                        .catch((err) => {
                          console.error("Error duplicating scheme:", err);
                          toggleNotification(
                            "Error",
                            "Scheme duplication failed !",
                            "danger",
                          );
                        });
                    }}
                  >
                    <IoDuplicateOutline size={20} />
                  </Button>
                  <Button variant="transparent" c={"red"} px={0} onClick={open}>
                    <AiOutlineDelete size={20} />
                  </Button>
                  <Modal
                    key={index}
                    opened={delModalOpened}
                    onClose={() => {
                      close();
                    }}
                    centered
                    size="45%"
                    padding="md"
                    yOffset="8em"
                    title={
                      <Text size="lg" c="gray" fw={600}>
                        Please confirm deletion
                      </Text>
                    }
                  >
                    <Text size="sm">
                      Are you sure you want to delete scheme: {record.name}?
                      This cannot be undone!
                    </Text>
                    <Group justify="flex-end" gap="xs" mt="md">
                      <Button
                        onClick={() => {
                          close();
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="filled"
                        color="red"
                        onClick={() => {
                          // send API to delete
                          axios
                            .delete(
                              `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${program.id}/versions/${version.id}/assessment-schemes/${record.id}`,
                            )
                            .then(async (res) => {
                              queryClient.invalidateQueries({
                                queryKey: ["scheme"],
                              });
                              close();
                              toggleNotification(
                                "Success",
                                `Removed scheme: ${record.name}`,
                                "success",
                              );
                            })
                            .catch((err) => {
                              console.error("Error deleting scheme:", err);
                              toggleNotification(
                                "Error",
                                "Scheme deletion failed !",
                                "danger",
                              );
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Modal>
                </Group>
              );
            },
          },
        ]}
        paginationText={({ from, to, totalRecords }) =>
          `Showing ${from} - ${to} of ${totalRecords}`
        }
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={
          searchedRecords.length > 0
            ? searchedRecords.length
            : fetchedSchemes && fetchedSchemes.length
        }
        recordsPerPage={pageSize}
        page={page}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  ) : (
    <div>Program not found</div>
  );
};

export default Page;
