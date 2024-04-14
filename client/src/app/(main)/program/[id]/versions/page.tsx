"use client";
import { useEffect, useState } from "react";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import Program from "@/app/interfaces/Program.interface";
import { CreateProgramVersionModal, UploadFileModal } from "@/app/_components";
import DeleteModal from "@/app/_components/Modals/DeleteModal";
import EditProgramModal from "@/app/_components/Modals/Program/EditProgramModal";
import { TextInput, Box, Group, ActionIcon, Anchor, Text } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

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
        console.log("TARGET:", targetProgram);
        buildBreadCrumbs(targetProgram);
        setProgram(targetProgram);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });
  return program ? (
    <div className="flex h-full flex-col">
      <div className="flex gap-2">
        <Text size="md" fw={600}>
          Program:
        </Text>
        <Text size="md" fw={400}>
          {program.name}
        </Text>
      </div>
      <div className="flex gap-2">
        <Text size="md" fw={600}>
          Major:
        </Text>
        <Text size="md" fw={400}>
          {program.major}
        </Text>
      </div>
      <div className="flex mt-2">
        <CreateProgramVersionModal programId={program.id}/>
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
              accessor: "id",
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
                    {record.id}
                  </Anchor>
                );
              },
            },
            {
              accessor: "name",
              title: "Effective Period",
              sortable: true,
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
          records={program.versions}
        />
      </div>
    </div>
  ) : (
    <div>Program not found</div>
  );
};

export default Page;
