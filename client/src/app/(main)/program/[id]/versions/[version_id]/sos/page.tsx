"use client";
import { useEffect, useState } from 'react'
import Program, { SO, Version } from '@/app/interfaces/Program.interface';
import { useBreadCrumbs } from '@/app/providers/BreadCrumbProvider';
import { useProgram } from '@/app/providers/ProgramProvider';
import { ActionIcon, Anchor, Box, Group, Text, TextInput } from '@mantine/core';
import formatDate from '@/app/lib/formatDate';
import CreateSOModal from '@/app/_components/Modals/SO/CreateSOModal';
import { UploadFileModal } from '@/app/_components';
import { BiSearch } from 'react-icons/bi';
import { DataTable } from 'mantine-datatable';
import Link from 'next/link';
import { IconEye, IconTrash } from '@tabler/icons-react';
import axios from 'axios';

const Page = ({ params }: { params: { id: string, version_id: string } }) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version ,setVersion] = useState<Version | null>(null);
  const {buildBreadCrumbs} = useBreadCrumbs();
  const {getProgram} = useProgram();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [SOs, setSOs] = useState<SO[]>([])
  console.log("SOs", SOs)

  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(existedVersion => existedVersion.id == parseInt(params.version_id))[0];
        buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${targetProgram.id}/versions/${targetVersion.id}`)
        const targetSOs = response.data.studentOutcomes;
        setSOs(targetSOs);
      }
    };

    if (!program) {
      fetchProgram();
    }
  })
  return program && version ? (
    <div className='flex h-full flex-col'>
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
      <div className="flex gap-2">
        <Text size="md" fw={600}>
          Version:
        </Text>
        <Text size="md" fw={400}>
          {version.name} ({formatDate(version.startDate.toString())} - {formatDate(version.endDate.toString())})
        </Text>
      </div>
      <div className="mt-2 flex">
        <CreateSOModal programId={program.id} versionId={version.id} setSOs={setSOs}/>
        <UploadFileModal
          object="SOs"
          setFileUploaded={setFileUploaded}
        />
        <TextInput
          placeholder="Search SO..."
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
              accessor: "code",
              title: "SO Code",
              width: "10%",
              sortable: true,
              render: (record) => {
                return (
                  <Link
                    href={`/program/${program.id}/versions/${version.id}/sos/${record.id}`}
                    className="text-blue-600 underline hover:text-blue-900"
                  >
                    {record.id}
                  </Link>
                );
              },
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
                    <ActionIcon size="sm" variant="subtle" color="green">
                      <Link href={`/program/${record.id}/versions`}>
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
          records={SOs}
        />
      </div>
    </div>
  ) : <div>Program not found</div>
}

export default Page
