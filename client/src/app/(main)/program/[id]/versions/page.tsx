"use client";
import { useEffect, useState } from "react";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import Program, { Version } from "@/app/interfaces/Program.interface";
import { CreateProgramVersionModal, UploadFileModal, PageHeader, NavigationContext } from "@/app/_components";
import DeleteModal from "@/app/_components/Modals/DeleteModal";
import EditProgramModal from "@/app/_components/Modals/Program/EditProgramModal";
import { TextInput, Box, Group, ActionIcon, Anchor, Text } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import EditProgramVersionModal from "@/app/_components/Modals/Program/EditProgramVersionModal";
import formatDate from "@/app/lib/formatDate";

const Page = ({ params }: { params: { id: string } }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [program, setProgram] = useState<Program | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const { buildBreadCrumbs } = useBreadCrumbs();
  const { getProgram } = useProgram();

  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.id));
      if (targetProgram) {
        buildBreadCrumbs(targetProgram);
        setProgram(targetProgram);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });

  const handleDeleteVersion = (version: Version) => {
    if(program) {
      setProgram({...program, versions: program.versions.filter(existedVersion => existedVersion.id != version.id)});
    }
  }
    
  return program ? (
    <div className="flex h-full flex-col gap-3">
      <PageHeader pageTitle="Versions Management" />
      <NavigationContext program={program}/>

      <div className="mt-2 flex">
        <CreateProgramVersionModal programId={program.id} program={program} setProgram={setProgram} />
        <UploadFileModal
          object="program versions"
          setFileUploaded={setFileUploaded}
        />
        <TextInput
          placeholder="Search program version..."
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
              accessor: "name",
              title: "Version ID",
              width: "10%",
              sortable: true,
              render: (record) => {
                return (
                  <Anchor
                    component={Link}
                    href={`/program/${program.id}/versions/${record.id}`}
                    className="text-blue-600 underline hover:text-blue-900"
                  >
                    {record.name}
                  </Anchor>
                );
              },
            },
            {
              accessor: "startDate",
              title: "Start Date",
              sortable: true,
              render: (record) => {
                return <Text>{formatDate(record.startDate)}</Text>;
              },
            },
            {
              accessor: "endDate",
              title: "End Date",
              sortable: true,
              render: (record) => {
                return <Text>{formatDate(record.endDate)}</Text>;
              },
            },
            // {
            //   accessor: "branches",
            //   title: "Branches",
            //   sortable: true,
            // },
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
                    <ActionIcon size="sm" variant="subtle" color="green">
                      <Link
                        href={`/program/${program.id}/versions/${record.id}`}
                      >
                        <IconEye size={16} />
                      </Link>
                    </ActionIcon>
                    <EditProgramVersionModal program={program} version={record} setProgram={setProgram} />
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      color="red"
                      onClick={DeleteModal<Version>("version", record, handleDeleteVersion, `${process.env.NEXT_PUBLIC_DELETE_PROGRAM_URL!}/${program.id}/versions/${record.id}`)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                );
              },
            },
          ]}
          records={program.versions}
        />
      </div>
    </div>
  ) : (
    <div className="flex h-full flex-col gap-3">
      <PageHeader pageTitle="Versions Management" />
      <div>Program not found</div>
    </div>
  );
};

export default Page;
